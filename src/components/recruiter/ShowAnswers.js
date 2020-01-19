import React, {Component} from 'react';
import {Auth} from "aws-amplify";
import axios from "axios";
import Form from "react-bootstrap/Form";

class ShowAnswers extends Component {

    state = {
        questionAnswers: [],
    };

    async componentDidMount() {
        axios
            .get(`https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests/answers/${this.props.match.params.id}/${this.props.auth.user.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                },
            })
            .then((res) => {
                this.setState({
                    questionAnswers: res.data.map(item => ({
                        question: item.question,
                        answer: item.answer
                    }))
                });
            })
    }

    render() {
        return (
            <section class="section auth">
                <Form>
                    <h2>Answers for test: </h2><br/><br/>
                    {this.state.questionAnswers.map(item => (
                        <ul>
                            <li><b>Question:  {item.question}</b></li>
                            <li>Answer:    {item.answer}</li>
                        </ul>
                    ))}
                </Form>
            </section>
        );
    }
}

export default ShowAnswers;
