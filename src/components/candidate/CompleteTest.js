import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/* wysylanie*/
class CompleteTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: JSON,
        };
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/${id}`)
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                console.log(jsonData.Items[0]);
                this.setState({
                    response: jsonData.Items[0]
                })
            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            })
    }

    answerQuestion = (questions) => {
        if (questions.answers) {
            return questions.answers.map((answers) => (
                <Form.Check
                    custom
                    id={Math.random()}
                    type={'checkbox'}
                    label={answers}
                />))
        } else {
            return <Form.Control as="textarea" rows="3"/>
        }
    };

    questionsList = () => {
        if (this.state.response.langs) {
            return this.state.response.langs.map((item) => (
                <Form.Group controlId="candidateQuestion">{item.questions.map((questions) => (
                    <div className="formQuestions">
                        <h5>Question {questions.no}</h5>
                        <Form.Label>{questions.question}</Form.Label>
                        {this.answerQuestion(questions)}
                    </div>))}</Form.Group>
            ))
        }
    };

    render() {
        return (
            <section className="section">
                <Form>
                    <h1>{this.state.response.testName}</h1>
                    {this.questionsList()}
                    <Form.Row>
                        <Button id="saveTestButton" type="submit" variant="success" className="mt-3"> Save
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

