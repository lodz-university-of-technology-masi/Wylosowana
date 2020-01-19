import React, {Component} from 'react';
import {Auth} from "aws-amplify";
import axios from "axios";
import Form from "react-bootstrap/Form";

class ShowAnswers extends Component {

    state = {
        tests: [],
        questionAnswers: [],
        toShow: "Wait please"
    }

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        axios
            .get(`https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests/answers/${this.props.match.params.id}/${this.props.auth.user.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                },
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    questionAnswers: res.data.map(item => ({
                        question: item.question,
                        answer: item.answer
                    }))
                });
            }).then(this.createTable);
    }

    createTable = () => {
        let table = [];

        for (let temp of this.state.questionAnswers) {
            let row = "<ul>";
            row+="<li>Question:   " +  temp.question + "</li>";
            row+="<li>Answer:   " + temp.answer + "</li>";
            row+="</ul>";
            table.push( <ul dangerouslySetInnerHTML={{__html: row}}/>);
        }

        this.setState({
            toShow: table
        });
    };

    render() {
        return (
            <section class="section auth">
                <Form>
                    <h2>Answers for test: </h2><br/><br/>
                    {this.state.toShow}
                </Form>
            </section>
        )
    }
}

export default ShowAnswers;
