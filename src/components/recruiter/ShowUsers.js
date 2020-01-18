import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid'
import config from "../../config";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import {Auth} from "aws-amplify";
import Constants from "../Constants";
import {listCandidates} from "../auth/CognitoUsers";
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
            .get('https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests', {
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
                        candidateLogins: item.candidateLogins,
                        id: item.id,
                        langs: item.langs,
                        instances: item.answers,
                        testName: item.testName
                    }))
                });
            });

        listCandidates().then((res) => {
            this.setState({
                users: res.data.map(item => ({
                    userName: item.username,
                    selected: false,
                    id: uuid.v4()
                }))
            });
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
                        console.log(test.instances)
                       /*if(test.candidateLogins){
                            for(let c=0; c<test.candidateLogins.length; c++){
                                if(test.candidateLogins[c] == row.userName){
                                   rowData += '<li><a href=\"/?#/showsolvedtest/'+test.id+'\" >' + test.testName + '</a></li>';
                                    //rowData+= '<li><a href=\"/?#/showsolvedtest/'+test.instances+'\" >' + test.testName + '</a></li>';
                                }
                            }
                        }*/

                        for(let y = 0; y < test.instances.length; y++)
                        {
                            if(test.instances[y].login == row.userName)
                            {
                               rowData+= '<li><a href=\"/?#/showAnswers/'+test.instances[y].answerId +'\" >' + test.testName + '</a></li>';
                            }

                        }

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
