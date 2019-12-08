import React, { Component } from 'react';
import Constants from "../Constants";
import {Auth} from "aws-amplify";
import axios from "axios";

class ShowTests extends Component{

    state = {
        tests: []
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
                this.setState({
                    tests: res.data.Items.map(item => ({
                        candidate_logins: item.candidate_logins,
                        id: item.id,
                        langs: item.langs,
                        testName: item.testName
                    }))
                });
            });
    }

    createTable = () => {

        let table = []

        if(this.state.tests) {
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
        }
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

export default ShowTests;