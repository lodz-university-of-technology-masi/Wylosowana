import React, {Component} from 'react';
import axios from 'axios';
import {Auth} from "aws-amplify";
import Table from "react-bootstrap/Table";

class ShowUsers extends Component {

    state = {
        tests: [],
        usersTests: [],
        tabel: []
    };

    async componentDidMount() {
        axios
            .get('https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/answers', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                }
            })
            .then((res) => {
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

        usersTests.forEach(item => {
            if (usersLogin.indexOf(item.candidateLogin) < 0) {
                usersLogin.push(item.candidateLogin);
            }
        });

        let content = [];

        for (let temp of usersLogin) {
            let listSolvedTests = [];

            usersTests.forEach(item => {
                if (item.candidateLogin === temp) {
                    let solvedTest = {};
                    solvedTest.testId = item.testId;
                    solvedTest.testName = item.testName;
                    listSolvedTests.push(solvedTest)
                }
            });

            let row = {
                candidateLogin: temp,
                listSolvedTests: listSolvedTests

            };

            content.push(row);
        }

        this.setState({
            tabel: content
        });
    };

    render() {
        return (
            <section class="section">
                <ul>
                    <Table striped bordered size="sm">
                        <thead>
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Tests</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tabel.map(item => (
                            <tr>
                                <td><strong>{item.candidateLogin}</strong></td>
                                <td>
                                    {item.listSolvedTests.map(item => (
                                        <li><a href={"/?#/showAnswers/" + item.testId}> {item.testName} </a></li>
                                    ))}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </ul>
            </section>
        )
    }
}

export default ShowUsers;
