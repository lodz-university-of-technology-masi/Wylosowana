import React, { Component } from 'react';
import Constants from "../Constants";
import {Auth} from "aws-amplify";
import axios from "axios";
import Form from "react-bootstrap/Form";

class ShowAnswers extends Component{

    state = {
        tests: []
    }
    constructor(props) {
        super(props)
    }

    async componentDidMount() {

        //console.log(this.props.match.params.testId);
        const {id} = this.props.match.params;
        axios
            .get(`https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/instances/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    testId: id,
                    testName: res.data.testName,
                    userName: res.data.login,
                    answers: res.data.answers,
                    questionss: res.data.langs
                    /*,
                    instances: res.data.Items.map(item => ({
                        candidate_login: item.login,
                        id: item.id,
                        testId: item.testId,
                        answers: item.answers
                    }))*/
                });
            });

    }

    createTable = () => {

        let table = []

        let row = this.state;
        let rowData = "<div>";
        if (row.answers) {
            let answers = "";
            let questions = "";
            for (let l = 0; l < row.answers.length; l++) {
                let answer = row.answers[l];
                //console.log(answer)
                let question = row.questionss[0].questions[l];
              //  console.log(question)
               // answers += "<li>Pytanie #" + answer.no + ": ";//
                if(answer.answer){
                    questions += "Pytanie:     " + question.question + " " ;
                   // console.log(question)
                    answers += "\n Odpowiedź:  " + answer.answer;
                }/*else if(answer.answers){
                    for(let a=0; a < answer.answers.length; a++){
                        questions += question.question;
                        answers += answer.answers[a] + ", ";
                    }
                }*/
                questions += "</li>";
                answers += "</li>";
                // </li>";
            }
            rowData += '<ul>'+ questions + "\n" + answers + '</ul>';
        }
        rowData += "</div><br/><br/>";
        table.push(<div dangerouslySetInnerHTML={{__html: rowData}}></div>)

        return table
    }

    render() {
        //console.log(this.state);
        //alert(this.state)
       console.log(this.state.questionss)
        console.log(this.state.answers)
        return (
            <section class="section auth">
                <Form>
                    <h2>Answers for test {this.state.testName}, filled by {this.state.userName}:</h2><br/><br/>
                    <ul>
                        {this.createTable()}
                    </ul>
                </Form>
            </section>
        )
    }
}

export default ShowAnswers;
