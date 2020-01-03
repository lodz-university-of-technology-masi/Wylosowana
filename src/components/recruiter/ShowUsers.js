import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid'
import config from "../../config";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import {Auth} from "aws-amplify";
import Constants from "../Constants";
import {cognitoidentityserviceprovider} from "../auth/CognitoUsers";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Test from "./ShowAndTranslateTests/Test";
import Table from "react-bootstrap/Table";

class ShowUsers extends Component{

    state = {
        tests: [],
        users: []
    }
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        axios
            .get(Constants.PROXYURL + 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                }
            })
            .then((res) => {
                console.log(res);
                console.log(res);
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

    }

    createTable = () => {

        let table = []

        /*if(this.state.tests) {
            for (let t = 0; t < this.state.tests.length; t++) {
                let row = this.state.tests[t];
                let rowData = "<div>";
                if (row.langs) {
                    for (let l = 0; l < row.langs.length; l++) {
                        let questions = "";
                        if (row.langs[l].questions) {
                            for (let q = 0; q < row.langs[l].questions.length; q++) {
                                questions += '<li>' + row.langs[l].questions[q].question + '</li>';
                            }
                        }
                        rowData += '<ul>' + questions + '</ul>';
                    }

                }
                rowData += '<a href="/?#/showsolvedtest/'+row.id+'" >zobacz odpowiedzi</a> </div><br/><br/>';
                table.push(<li><strong>{row.testName}:</strong><br/>
                    <ul dangerouslySetInnerHTML={{__html: rowData}}></ul>
                </li>)
            }
        }*/

        //{userName: "user1", selected: false, id: "e4de41df-1e48-4692-b354-45427b95d6f2"}
        console.log(this.state.tests);

        let content = [];

        if(this.state.users){
            for (let u = 0; u < this.state.users.length; u++) {
                let row = this.state.users[u];
                let rowData = "<div><ul>";

                    for (let t = 0; t < this.state.tests.length; t++) {
                        let test = this.state.tests[t];

                        /*if(test.candidate_logins){
                            for(let c=0; c<test.candidate_logins.length; c++){
                                if(test.candidate_logins[c] == row.userName){
                                    rowData += '<li><a href=\"/?#/showsolvedtest/'+test.id+'\" >' + test.testName + '</a></li>';
                                }
                            }
                        }*/
                    }


                rowData += "</ul></div>";
                // /rowData += "<strong>" + row.userName + "</strong>";
                content.push(<tr><td><strong>{row.userName}</strong></td><td>
                    <ul dangerouslySetInnerHTML={{__html: rowData}}></ul></td>
                </tr>)
            }
        }

        table.push(<Table striped bordered size="sm">
            <thead>
            <tr>
                <th scope="col">User</th>
                <th scope="col">Tests</th>
            </tr>
            </thead>
            <tbody>
            {content}
            </tbody>
        </Table>);

        return table
    }

    render() {
        return (
            <section class="section">
                <ul>
                    {this.createTable()}
                </ul>
            </section>
        )
    }
}


const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    AttributesToGet: [],
    Filter: 'name ^= \"Candidate\"',
};

export default ShowUsers;