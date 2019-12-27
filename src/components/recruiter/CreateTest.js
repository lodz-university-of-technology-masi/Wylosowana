import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import $ from 'jquery';
import {ButtonGroup} from "react-bootstrap";
import {cognitoidentityserviceprovider} from "../auth/CognitoUsers";
import {params} from "../auth/CognitoUsers";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

let globalAnswers = []
let globalQuestionAnswers = []
let globalQuestions = []
let globalClosedQuestions = []
let globalTrueSelect = []
let globalCandidates = []

class CreateTest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lang: '',
            correct: '',
            tempQuestion: '',
            tempClosedQuestion: '',
            candidate: '',
            candidateList: [],
            answ1: '',
            answ2: '',
            answ3: '',
            answ4: ''
        };

        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
        this.handleQuestionClosedTextChange = this.handleQuestionClosedTextChange.bind(this);
        this.handleAnswers = this.handleAnswers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        cognitoidentityserviceprovider.listUsers(params, (err, data) => {
            if (err)
                console.log(err, err.stack);
            else {
                this.setState({
                    candidateList: data.Users.map(cand => cand.Username)
                });
            }
        });

    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    handleLanguageChange(e) {
        this.setState({
            lang: e.target.value
        })
    };

    handleCandidateChange(e) {
        this.setState({
            candidate: e.target.value
        })
    };

    handleCorrectChange(e) {
        this.setState({
            correct: e.target.value
        })
    };

    handleQuestionTextChange(e) {
        this.setState({
            tempQuestion: e.target.value
        })
    };

    handleQuestionClosedTextChange(e) {
        this.setState({
            tempClosedQuestion: e.target.value
        })
    };

    handleAnswers(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    saveClosedQuestion = (event) => {
        globalClosedQuestions.push(this.state.tempClosedQuestion)
        globalAnswers.push([this.state.answ1, this.state.answ2, this.state.answ3, this.state.answ4])
        globalTrueSelect.push(globalQuestionAnswers)
        this.setState({
            tempClosedQuestion: ' '
        });
        this.setState({
            answ3: ' ',
            answ2: ' ',
            answ1: ' ',
            answ4: ' ',
        });
        if(this.state.correct !== 'default'){
            this.saveQuestionAnswer()
        }
        globalQuestionAnswers = []
    }

    saveQuestionAnswer = () => {
        globalQuestionAnswers.push(this.state.correct);
        this.setState({
            correct: 'default'
        });
    }

    saveOpenQuestion = (event) => {
        globalQuestions.push(this.state.tempQuestion);
        this.setState({
            tempQuestion: ' '
        });
    }

    saveCandidate = (event) => {
        globalCandidates.push(this.state.candidate);
        this.setState({
            candidate: ' '
        });
    }


    handleSubmit(event) {
        const questions = globalClosedQuestions.concat(globalQuestions)
            .map((val, ind) => {
                let sizeCloseQuest = globalClosedQuestions.length;
                if (ind < sizeCloseQuest) {
                    return {
                        "no": ind,
                        "question": val,
                        "answers": globalAnswers[ind],
                        "correct": globalTrueSelect[ind]
                    }
                } else
                    return {"no": ind, "question": val}
            })


        const validateTest = {
            "testName": this.state.name,
            "langs": [
                {
                    "lang": this.state.lang,
                    "questions": questions
                }
            ],
            "candidate_logins": globalCandidates
        }

        console.log(validateTest)

        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests',
            data: JSON.stringify(validateTest),
            success: function (data, err) {
                if (err)
                    console.log(err);
                console.log(data);
            }
        });

        // this.props.history.push('/');
    }


    render() {
        return (
            <section className="section auth">
                <Form onSubmit={this.handleSubmit}>
                    <h1>Test</h1>

                    <Form.Group controlId="controlInputName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" onChange={this.handleNameChange}/>
                    </Form.Group>

                    <Form.Group controlId="controlSelectLang">
                        <Form.Label>Language</Form.Label>
                        <Form.Control as="select" onChange={this.handleLanguageChange.bind(this)}
                                      value={this.state.language}>
                            <option value="default" hidden>Select a language</option>
                            <option value="EN">English</option>
                            <option value="PL">Polish</option>
                        </Form.Control>
                    </Form.Group>

                    <h4>Questions</h4>
                    <Form.Group controlId="controlQuestion">
                        <Form.Label> Open Question</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.tempQuestion}
                                      onChange={this.handleQuestionTextChange} placeholder="Type question here..."/>
                        <div className="float-right">
                            <ButtonGroup>
                                <Button id="saveOpenQuestButton"
                                        name="tempQuestion" onClick={this.saveOpenQuestion}
                                        variant="primary"
                                        size="sm">Add</Button>
                            </ButtonGroup>
                        </div>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="controlClQuestion">
                        <Form.Label> Closed Question</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.tempClosedQuestion}
                                      onChange={this.handleQuestionClosedTextChange}
                                      placeholder="Type question here..."/>
                        <div>
                            <Form.Group>
                                <Form.Control as="textarea" name="answ1" placeholder="answer" value={this.state.answ1}
                                              onChange={this.handleAnswers} rows="1"/>
                                <Form.Control as="textarea" name="answ2" placeholder="answer" value={this.state.answ2}
                                              onChange={this.handleAnswers} rows="1"/>
                                <Form.Control as="textarea" name="answ3" placeholder="answer" value={this.state.answ3}
                                              onChange={this.handleAnswers} rows="1"/>
                                <Form.Control as="textarea" name="answ4" placeholder="answer" value={this.state.answ4}
                                              onChange={this.handleAnswers} rows="1"/>
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group controlId="controlSelectTrue">
                                <Form.Control as="select" onChange={this.handleCorrectChange.bind(this)}
                                              value={this.state.correct}>
                                    <option value="default" hidden>Select a correct</option>
                                    <option value="1">first</option>
                                    <option value="2">second</option>
                                    <option value="3">third</option>
                                    <option value="4">fourth</option>
                                </Form.Control>
                            </Form.Group>
                            <div className="float-right">
                                <ButtonToolbar>
                                    <Button id="saveCorrectButton"
                                            name="tempCorrectAnswer" onClick={this.saveQuestionAnswer}
                                            variant="secondary"
                                            size="sm">Correct</Button>
                                    <Button id="saveClosedQuestButton"
                                            name="tempQuestion" onClick={this.saveClosedQuestion}
                                            variant="primary"
                                            size="sm">Add</Button>
                                </ButtonToolbar>
                            </div>
                            <br/>
                        </div>
                    </Form.Group>

                    <div>
                    <Form.Group controlId="controlSelectUsers">
                        <Form.Label>Candidates</Form.Label>
                        <Form.Control as="select" onChange={this.handleCandidateChange.bind(this)}
                                      value={this.state.candidate}>
                            <option value="default" hidden>Select a candidate</option>
                            {this.state.candidateList.map((candidate, ind) =>
                                <option key={ind} value={candidate}>{candidate}</option>
                            )};
                        </Form.Control>
                        <div className="float-right">
                            <ButtonGroup>
                                <Button id="saveCandidateButton"
                                        name="tempQuestion" onClick={this.saveCandidate}
                                        variant="primary"
                                        size="sm">Add</Button>
                            </ButtonGroup>
                        </div>
                    </Form.Group>
                    </div>

                    <div>
                        <Button id="saveTestButton" type="submit" variant="success" className="mt-3"> Save
                            Test </Button>
                    </div>
                </Form>
            </section>
        )
    }

}

export default CreateTest;