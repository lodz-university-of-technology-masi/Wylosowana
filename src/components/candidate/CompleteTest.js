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
        fetch(`https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        })
            .then(response => response.json())
            .then((jsonData) => {
                var lang = jsonData.langs[0];
                var theAnswers = [];
                if (lang) {
                        lang.questions.map(function(question) {
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
                }

                this.setState({
                    response: jsonData,
                    userAnswers: theAnswers,
                    testId: jsonData.id,
                    language: jsonData.langs[0].lang
                });

            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            })
    }



    handleOptionChange = (e) => {
        let no = e.target.getAttribute('data-no');
        let answerIndex = parseInt(e.target.getAttribute('data-index'),10);

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
        })

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
     //           a.lang = e.target.getAttribute('data-lang');
            }
        });


        this.setState({
            userAnswers: userAnswers
        })
    };


    answerQuestion = (question, lang) => {

        let component = this;

        if (question.answers) {
            let output = [];
            if(question.answers)
            question.answers.map(function(answer, index){
                let id = question.no + "_" + index;
                output.push( <Form.Check
                    custom
                    id={id}
                    data-no={question.no}
                    data-index={index}
                    type={'checkbox'}
                    label={answer}
                    onChange={component.handleOptionChange}
                    key = {index}
                /> );
            });
            return output;
        } else {
            return <Form.Control id={question.no} as="textarea" data-lang={lang} rows="3" onChange={component.handleOpenChange} />
        }
    };

    questionsList = () => {
        if (this.state.response.langs) {
            return this.state.response.langs[0].questions.map((item,index) => (
                <Form.Group key={index}>
                    <div className="formQuestions">
                        <h5>Question {item.no}</h5>
                        <Form.Label>{item.question}</Form.Label>
                        {this.answerQuestion(item, this.state.response.langs[0].lang)}
                    </div></Form.Group>
            ))
        }
    };

    goBack() {
        this.props.history.push("/");
    };

    handleSubmit2 = async () => {

        const these = this;
        this.state.userAnswers.forEach(a => {
            if(a.hasOwnProperty("answers"))
                 a.answers = a.answers.map(String)
        });

        let formInstance = {
            'testId': this.state.testId,
            'login': this.props.auth.user.username,
            'lang': this.state.language,
            'answers': this.state.userAnswers
        };


        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/answers/',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
            data: JSON.stringify(formInstance),
            success: function (data, err) {
                if (err)
                    console.log(err);
                alert('Test zostal wyslany');
                these.goBack();
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
                        <div className="buttons-space"/>
                        <Button id="saveTestButton" type="submit" variant="danger" className="mt-3"
                                href="#showcandidatetests"> Back </Button>
                    </Form.Row>
                </Form>
            </section>
        )
    }
}

export default CompleteTest;

