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
import {forEach} from "react-bootstrap/cjs/utils/ElementChildren";

class ShowUsers extends Component {

    state = {
        tests: [],
        usersTests: [],
        tabel: "Prosze czekać"
    };

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        axios
            .get('https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/answers', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                }
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    usersTests: res.data.map(item => ({
                        testId: item.testId,
                        testName: item.testName,
                        candidateLogin: item.candidateLogin
                    }))
                });
            }).then(this.createTable);
    }

    createTable = () => {
        let usersLogin = [];
        let usersTests = this.state.usersTests;

        usersTests.map(item => {
            if (usersLogin.indexOf(item.candidateLogin) < 0) {
                usersLogin.push(item.candidateLogin);
            }
        });

        console.log(usersLogin);

        let content = [];

        for (let temp of usersLogin) {
            let rowData = "<div><ul>";

            usersTests.map(item => {
                if (item.candidateLogin === temp) {
                    rowData += '<li><a href=\"/?#/showAnswers/' + item.testId + '\" >' + item.testName + '</a></li>';
                }
            });

            rowData += "</ul></div>";

            content.push(<tr>
                <td><strong>{temp}</strong></td>
                <td>
                    <ul dangerouslySetInnerHTML={{__html: rowData}}/>
                </td>
            </tr>)
        }

        this.setState( {
            tabel: (<Table striped bordered size="sm">
                <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Tests</th>
                </tr>
                </thead>
                <tbody>
                {content}
                </tbody>
            </Table>)
        }) ;
    };

    render() {
        return (
            <section class="section">
                <ul>
                    {this.state.tabel}
                </ul>
            </section>
        )
    }
}

export default ShowUsers;
