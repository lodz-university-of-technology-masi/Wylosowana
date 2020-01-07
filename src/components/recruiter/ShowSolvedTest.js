import React, { Component } from 'react';
import Constants from "../Constants";
import {Auth} from "aws-amplify";
import axios from "axios";
import Form from "react-bootstrap/Form";

class ShowSolvedTest extends Component{

    state = {
        tests: []
    }
    constructor(props) {
        super(props)
    }

    async componentDidMount() {

        const {id} = this.props.match.params;
        axios
            .get( `https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/answers/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    testId: id,
                    instances: res.data.Items.map(item => ({
                        candidate_login: item.login,
                        id: item.id,
                        testId: item.testId,
                        answers: item.answers
                    }))
                });
            });
    }

    createTable = () => {

        let table = []

        if(this.state.instances) {
            for (let t = 0; t < this.state.instances.length; t++) {
                let row = this.state.instances[t];
                let rowData = "<div>";
                if (row.answers) {
                    let answers = "";
                    for (let l = 0; l < row.answers.length; l++) {
                        let answer = row.answers[l];
                        answers += "<li>" + answer.no + ": ";//
                        if(answer.answer){
                            answers += answer.answer;
                        }else if(answer.answers){
                            for(let a=0; a < answer.answers.length; a++){
                                answers += answer.answers[a] + ", ";
                            }
                        }
                        answers += "</li>";
                        // </li>";
                    }
                    rowData += '<ul>' + answers + '</ul>';
                }
                rowData += "</div><br/><br/>";
                table.push(<li><strong>{row.candidate_login}:</strong><br/>
                    <ul dangerouslySetInnerHTML={{__html: rowData}}></ul>
                </li>)
            }
        }
        return table
    }

    render() {
        console.log(this.state);
        return (
            <section class="section auth">
                <Form>
                <h2>Answers for test #{this.state.testId}:</h2><br/><br/>
                <ul>
                    {this.createTable()}
                </ul>
                </Form>
            </section>
        )
    }
}

export default ShowSolvedTest;
