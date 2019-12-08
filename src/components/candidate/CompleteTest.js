import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import Constants from "../Constants";
import {Auth} from "aws-amplify";

class CompleteTest extends Component {
    constructor(props) {
        super(props);
        this.testIsSent = this.testIsSent.bind(this);
        this.state = {
            response: JSON,
            userAnswers: []
        };
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`${Constants.PROXYURL}https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        })
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                console.log(jsonData.Items[0]);

                var langs = jsonData.Items[0].langs;
                //console.log(this.state.response);
                var theAnswers = [];
                if (langs) {
                    langs.map(function(item){
                        item.questions.map(function(question) {
                            if (question.answers){
                                theAnswers.push({
                                    "no": question.no,
                                    "answers": []
                                });
                                console.log(question);
                            }else{
                                theAnswers.push({
                                    "no": question.no,
                                    "answer": null
                                });
                                console.log(question);
                            }
                        });
                    });
                }



                this.setState({
                    response: jsonData.Items[0],
                    userAnswers: theAnswers,
                    testId: jsonData.Items[0].id
                });

                console.log(this.state);
            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            })
    }



    handleOptionChange = (e) => {
        let no = e.target.getAttribute('data-no');
        let answerIndex = e.target.getAttribute('data-index');

        var userAnswers = this.state.userAnswers;
        userAnswers.map(function(a){
            if(a.no == no){
                if(a.answers.includes(answerIndex)){
                    let index = a.answers.indexOf(answerIndex);
                    a.answers.splice(index, 1);
                }else{
                    a.answers.push(answerIndex);
                }
            }
        });

        this.setState({
            userAnswers: userAnswers
        });
        console.log(this.state);
    };

    handleOpenChange = (e) => {
        var no = e.target.id;
        var answer = e.target.value;

        var userAnswers = this.state.userAnswers;
        userAnswers.map(function(a){
            if(a.no == no){
                a.answer = answer;
                a.lang = e.target.getAttribute('data-lang');
            }
        });

        this.setState({
            userAnswers: userAnswers
        })
    };


    answerQuestion = (question, lang) => {

        let component = this;

        console.log("T");
        console.log(question);
        if (question.answers) {

            let output = [];

            //ladnie, answers[0][N] zamiast answers[N]
            if(
                question.answers.length &&
                question.answers[0].length > 1
            ){
                question.answers = question.answers[0];
            }

            question.answers.map(function(answer, index){
                let id = question.no + "_" + index;
                //alert(index);
                output.push( <Form.Check
                    custom
                    id={id}
                    data-no={question.no}
                    data-index={index}
                    type={'checkbox'}
                    label={answer}
                    onChange={component.handleOptionChange}
                /> );
            });
            return output;

            /*
                        return question.answers.map((answers) => (
                            <Form.Check
                                custom
                                id={question.no}
                                type={'checkbox'}
                                label={answers}
                                onChange={component.handleOptionChange}
                            />))*/
        } else {
            return <Form.Control id={question.no} as="textarea" data-lang={lang} rows="3" onChange={component.handleOpenChange} />
        }
    };

    questionsList = () => {
        if (this.state.response.langs) {
            return this.state.response.langs.map((item) => (
                <Form.Group controlId="candidateQuestion">{item.questions.map((question) => (
                    <div className="formQuestions">
                        <h5>Question {question.no}</h5>
                        <Form.Label>{question.question}</Form.Label>
                        {this.answerQuestion(question, item.lang)}
                    </div>))}</Form.Group>
            ))
        }
    };

    handleSubmit(event) {
        alert('Test zostal wyslany 2');
    };

    handleSubmit2 = () => {

        let formInstance = {
            'testId': this.state.testId,
            'login': this.props.auth.user.username,
            'answers': this.state.userAnswers
            /*[
                {
                    'no': this.state.userAnswers,
                    'answer': this.state.answers
                },
                {
                    'no': this.state.userAnswers,
                    'lang': 'EN',
                    'answer': this.state.answer
                }
                ]
            */

        };

        console.log(this.state);
        console.log(formInstance);

        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/answers/',
            data: JSON.stringify(formInstance),
            success: function(data,err){
                if(err)
                    console.log(err);
                console.log(data);
                alert('Test zostal wyslany');
            }
        });
    };


    testIsSent() {
        //  console.log(this);
        alert('Test zostal wyslany');
    };

    render() {
        return (
            <section className="section">
                <Form>
                    <h1>{this.state.response.testName}</h1>
                    {this.questionsList()}
                    <Form.Row>
                        <Button onClick={this.handleSubmit2} id="saveTestButton" type="submit" variant="success" className="mt-3"
                        > Save
                            Test </Button>
                        <div className="buttons-space"></div>
                        <Button id="saveTestButton" type="submit" variant="danger" className="mt-3"
                                href="#showcandidatetests"> Back </Button>
                    </Form.Row>
                </Form>
            </section>
        )
    }
}

export default CompleteTest;

