import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

class CreateTest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lang: '',
            questions: [],
        }
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

    handleOpenQuestionQuestionChange = idx => evt => {
        const newQuestions = this.state.questions.map((que, qidx) => {
            if (idx !== qidx) return que;
            return {...que, question: evt.target.value};
        });
        this.setState({questions: newQuestions});
    };

    handleAddOpenQuestion = () => {
        this.setState({
            questions: this.state.questions.concat([{no: 0, guestion: ""}])
        });
    };

    handleRemoveOpenQuestion = idx => () => {
        this.setState({
            questions: this.state.questions.filter((s, sidx) => idx !== sidx)
        });
    };
<<<<<<< HEAD

    createJson(){

    }

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
            </section>
        )
    }
}

export default CreateTest;