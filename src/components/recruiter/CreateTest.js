import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import $ from 'jquery';

class CreateTest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lang: '',
            questions: [],
            tempQuestion: '',
        }

        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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

    handleQuestionTextChange(e) {
        this.setState({
            tempQuestion: e.target.value
        })
    };

    handleOpenQuestionQuestionChange = idx => evt => {
        const newQuestions = this.state.questions.map((que, qidx) => {
            if (idx !== qidx) return que;
            return {...que, question: evt.target.value};
        });
        this.setState({questions: newQuestions});
    };

    handleAddOpenQuestion = () => {
        this.setState({
            questions: [...this.state.questions, this.state.tempQuestion]
        });
    };

    handleRemoveOpenQuestion = idx => () => {
        this.setState({
            questions: this.state.questions.filter((s, sidx) => idx !== sidx)
        });
    };
<<<<<<< HEAD

<<<<<<< HEAD
    createJson(){
=======
    handleSubmit(event) {
        console.log(this.state.name);
        const questions = this.state.questions
            .filter(v => v != '')
            .map( (val,ind) => {
                return { "no" : ind, "question" : val}
            })
        console.log(questions);

        const validateTest = {
            "testName": this.state.name,
            "langs": [
                {
                    "lang": this.state.lang,
                    "questions": questions
                }
            ],
            "candidate_ids": []
        }
>>>>>>> created test is sent to api and saved in db now

        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests',
            data: JSON.stringify(validateTest),
            success: function(data,err){
                if(err)
                    console.log(err);
                console.log(data);
            }
        });

        this.props.history.push('/');
    }

<<<<<<< HEAD
    // eslint-disable-next-line no-undef
/*    @action
    async add(data) {
        const headers = new Headers();
        headers.append('content-type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('url', options);
        const response = await fetch(request);
        const status = response.status;

        if (status === 201) {
            alert("Stworzono test");
        } else {
            alert("Nie udalo sie stworzyc testu");
        }
    }*/
/*
    handleAddCloseQuestion = () => {
        this.setState({
            questions: this.state.questions.concat([{no: 0, guestion: "",answers:[],correct:[]}])
        });
    };
=======
>>>>>>> Unnecessary files deleted and changed some view
=======

>>>>>>> created test is sent to api and saved in db now

        handleAddCloseQuestion = () => {
            this.setState({
                questions: this.state.questions.concat([{no: 0, guestion: "",answers:[],correct:[]}])
            });
        };

<<<<<<< HEAD
        handleQuestionAnswersChange = idx => evt =>{
            const newQuestions = this.state.questions((que,qidx) => {
                if(idx!==qidx) return que;
                return { que, answers(evt.target.value)};
            });
            this.setState({ questions: newQuestions });
        };*/
=======
        handleSaveTest = () => { 
            this.handleAddOpenQuestion();
        }

        /*
            handleAddCloseQuestion = () => {
                this.setState({
                    questions: this.state.questions.concat([{no: 0, guestion: "",answers:[],correct:[]}])
                });
            };

            handleQuestionAnswersChange = idx => evt =>{
                const newQuestions = this.state.questions((que,qidx) => {
                    if(idx!==qidx) return que;
                    return { que, answers(evt.target.value)};
                });
                this.setState({ questions: newQuestions });
            };*/
>>>>>>> redirect to home page

    render() {
        return (
            <section className="section auth">
<<<<<<< HEAD
            <Form>
                <h1>Test</h1>
                <Form.Group controlId="controlInputName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Name" />
                </Form.Group>
                <Form.Group controlId="controlSelectLang">
                    <Form.Label>Select a language</Form.Label>
                    <Form.Control as="select" onChange={this.handleLanguageChange} value={this.state.language}>
                        <option value="EN">English</option>
                        <option value="PL">Polish</option>
                    </Form.Control>
                </Form.Group>
                <h4>Questions</h4>
                {this.state.questions.map((que, idx) => (
                        <Form.Group controlId="controlQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                            <Button id="deleteButton" onClick={this.handleRemoveOpenQuestion(idx)} variant="danger" size="sm">Delete</Button>
                        </Form.Group>
                ))}
                <Button id="addOpenQuestionButton" variant="info" onClick={this.handleAddOpenQuestion}>Add Open Question</Button>
            </Form>
=======
                <Form onSubmit={this.handleSubmit}>
                    <h1>Test</h1>
                    <Form.Group controlId="controlInputName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" onChange={this.handleNameChange}/>
                    </Form.Group>
                    <Form.Group controlId="controlSelectLang">
                        <Form.Label>Select a language</Form.Label>
                        <Form.Control as="select" onChange={this.handleLanguageChange.bind(this)} value={this.state.language}>
                            <option value="EN">English</option>
                            <option value="PL">Polish</option>
                        </Form.Control>
                    </Form.Group>
                    <h4>Questions</h4>
                    {this.state.questions.map((que, idx) => (
                        <Form.Group controlId="controlQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={this.handleQuestionTextChange} />
                            <Button id="deleteButton" onClick={this.handleRemoveOpenQuestion(idx)} variant="danger"
                                    size="sm">Delete</Button>
                        </Form.Group>
                    ))}
                    <Button id="addOpenQuestionButton"  variant="info" onClick={this.handleAddOpenQuestion} >Add Open
                        Question</Button>
                    <div>
                     <Button id="saveTestButton" type="submit" variant="info" className="mt-3" onClick={this.handleSaveTest}> Save Test </Button>
                    </div>
                </Form>
>>>>>>> created test is sent to api and saved in db now
            </section>
        )
    }
}

export default CreateTest;