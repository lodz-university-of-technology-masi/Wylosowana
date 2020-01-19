import React, {Component} from 'react';
import axios from 'axios';
import {Auth} from "aws-amplify";
import Table from "react-bootstrap/Table";

class ShowUsers extends Component {

    state = {
        tests: [],
        usersTests: [],
        tabel: "Wait please"
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
