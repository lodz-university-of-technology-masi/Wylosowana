import React, {Component} from 'react';
import axios from 'axios';
import ChoiceTest from "./ChoiceTest";
import uuid from 'uuid'
import ChoiceUsers from "./ChoiceUsers";
import config from "../../../config";
import $ from "jquery";


class AssignUsersToTest extends Component {

    state = {
        tests: [],
        temp: [],
        modifiedTest: {},
        visibility: true,
        users: [],
        selectedUsers: [],
    };

    componentDidMount() {
        axios
            .get('https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests')
            .then((res) =>{
                this.setState({
                    tests: res.data.Items.map(item => ({
                        candidate_logins: item.candidate_logins,
                        id: item.id,
                        langs: item.langs,
                        testName: item.testName
                    }))
                });
            });

        cognitoidentityserviceprovider.listUsers(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({
                    users: data.Users.map(item => ({
                        userName: item.Username,
                        selected: false,
                        id: uuid.v4()
                    }))
                });
            }
            return data;
        });
        console.log(this.state.tests);
    };


    constructor(props) {
        super(props)
    }

    //Select Test
    selectTest = (id) => {
        let toRemove =[...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.candidate_logins})[0];
                this.setState({
                    modifiedTest: {
                        candidate_logins: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.candidate_logins})[0],
                        id: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.id})[0],
                        langs: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.langs})[0],
                        testName: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.testName})[0]
                    }
                });
        console.log(this.state.modifiedTest);
        this.setState({visibility: false});
        this.setState({users: this.state.users.filter( ( el ) => {
            return toRemove.indexOf( el.userName ) < 0;
        } )} )
    };

    modifyTest = () => {

        this.setState({
            modifiedTest: {
                candidate_logins: [...this.state.modifiedTest.candidate_logins,...this.state.selectedUsers],
                id: this.state.modifiedTest.id,
                langs: this.state.modifiedTest.langs,
                testName: this.state.modifiedTest.testName
            }
        });
    };

    createListSelectedUsers = () => {
        this.setState({
            selectedUsers: [...this.state.users.filter(user => {return (user.selected)}).map(e => e.userName)]
        })
    };

    selectUser = (id) => {
        this.setState({
            users: this.state.users.map(user => {
                if (user.id === id) {
                    user.selected = !user.selected
                }
                return user
            })
        })
        this.createListSelectedUsers();
    };

    handleSubmit = () => {

        const validateTest = {
            "testName": this.state.modifiedTest.testName,
            "langs": this.state.modifiedTest.langs,
            "candidate_logins": this.state.modifiedTest.candidate_logins,
            "id": this.state.modifiedTest.id,
        };

        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests',
            data: JSON.stringify(validateTest),
            success: function(data,err){
                if(err)
                    console.log(err);
                console.log(data);
            }
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                {this.state.visibility ?
                    <ChoiceTest tests={this.state.tests} selectTest={this.selectTest}/>
                    :
                    <div>
                        <h1>Add user to test {this.state.modifiedTest.testName}</h1>
{/*                        <ChoiceTest tests={this.state.tests}
                                    selectTest={this.selectTest}/>*/}
                        <ChoiceUsers users={this.state.users} selectUser={this.selectUser}/>
                    </div>}
                <button onClick={this.modifyTest} >
                    Submit
                </button>
                <button onClick={this.handleSubmit} >
                    Send
                </button>
            </div>
        )
    }
}

const AWS = require('aws-sdk');
const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    AttributesToGet: [],
};
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAZ2J3YGNP4C4OC7KY', 'lVNUCch3SYLd5kagT4j49qiS0Nmftp4xhSxUSoJq',
        'FwoGZXIvYXdzENz//////////wEaDBaA3p75O3QWO0KjYiLDAWIMR2uBOsA7Na9aGkSNuF3BHPGQ2TKljvPetJzTXMxZUTfK3H8+/O9PAco67vDwVSdrSpt6dxIdtYvK4k9Lx1HAvrl5TNU22F4qrMzcFb+l19WaOaN9IXKeVO78cYnyHHjUfGWLmKco5LuIf/0t/LSNlgutENoxwUPOUOfikavYbH9gEpVdDlFbITrPq7WGzISxya+R1PugRB6i/4GFcipL3mh265jw1y5/Sz4elgPKee2eOtZZc6uw8vqqjXB1r41k5yj9ypPvBTItat2Jby/50pijEK7po3dpn7wrlaGs/tDP75ou6dNVGxcP2Nzgvt6EzdfWnSEd')
});

export default AssignUsersToTest;
