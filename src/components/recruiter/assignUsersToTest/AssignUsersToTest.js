import React, {Component} from 'react';
import axios from 'axios';
import ChoiceTest from "./ChoiceTest";
import uuid from 'uuid'
import ChoiceUsers from "./ChoiceUsers";
import config from "../../../config";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import {Auth} from "aws-amplify";


const proxyurl = "https://cors-anywhere.herokuapp.com/";

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
            .get(proxyurl+'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests')
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
        if(toRemove!==undefined) {
            this.setState({
                users: this.state.users.filter((el) => {
                    return toRemove.indexOf(el.userName) < 0;
                })
            })
        }
    };

    modifyTest = () => {

        this.setState({
            modifiedTest: {
                candidate_logins: [...this.state.modifiedTest.candidate_logins,...this.state.selectedUsers],
                id: this.state.modifiedTest.id,
                langs: this.state.modifiedTest.langs,
                testName: this.state.modifiedTest.testName
            }}, () => {this.handleSubmit()}
        );
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

    handleSubmit = async () => {

        const validateTest = {
            "candidate_logins": this.state.modifiedTest.candidate_logins,
        };

        $.ajax({
            type: "PUT",
            dataType: "json",
            url: proxyurl + `https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/${this.state.modifiedTest.id}`,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
            data: JSON.stringify(validateTest),
            success: function (data, err) {
                if (err)
                    console.log(err);
                console.log(data);
            }
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <section className="section assignUsersToTests">
                {this.state.visibility ?
                    <ChoiceTest tests={this.state.tests} selectTest={this.selectTest}/>
                    :
                    <div>
                        <h1>Add user to test {this.state.modifiedTest.testName}</h1>
                        <ChoiceUsers users={this.state.users} selectUser={this.selectUser}/>
                        <Button id="selectButton"
                                name="selectTest" onClick={this.modifyTest}
                                variant="success"
                                size="lg">Submit</Button>
                    </div>}
            </section>
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
    credentials: new AWS.Credentials('ASIAZ2J3YGNPQSCPHTIW', 'Qw/PCoEPSB+Udu1UFOjEPatCGBg34Zq+G+H5NQEC',
        'FwoGZXIvYXdzEFgaDGElz8K9DgCcXTy2nCLDAQKrmkC7gaMIFftfozzLROIQiBhVNUOlqbJNg5ES8FHvf0zMSNDkN/cUilSzkHo6wUEgvRQtB61sE0og71YKbez55ZWvLW/7S+1Ulr5hnOkV+uvOaMpuDOl4Uia7ncZNt1XB/+Vt447q+W387jOzmlkUVtZXnBJ0YlkYfah1HI8CGcI/QKfrXn5sWXuhMZI2udr+zcgqV5hCGi9eWDcWDChGBsPOBIgCUmJpKYL4gzlhS4nUfTIfSATQB0HZS6DyJeX2Sijn+q7vBTItYVxlLlBeMbpkmLVsOzKlmI067h2/QQ+77AyaM9tyErM1na8/Y3vKQgOx3RIp')
});

export default AssignUsersToTest;
