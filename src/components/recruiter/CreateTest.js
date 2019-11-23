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



        handleAddCloseQuestion = () => {
            this.setState({
                questions: this.state.questions.concat([{no: 0, guestion: "",answers:[],correct:[]}])
            });
        };

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
                        <Form.Control as="select" onChange={this.handleLanguageChange.bind(this)} value={this.state.language}>
                            <option value="default" hidden>Select a language</option>
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
                     <Button id="saveTestButton" type="submit" variant="success" className="mt-3" onClick={this.handleSaveTest}> Save Test </Button>
                    </div>
                </Form>
            </section>
        )
    }
}

export default CreateTest;