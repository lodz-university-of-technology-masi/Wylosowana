import React, {Component} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import {Auth} from "aws-amplify";

class ShowCandidateTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: JSON
        };
    }

    async componentDidMount() {


        fetch(`https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests/candidates/${this.props.auth.user.username}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                }
            }
        )
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                console.log(jsonData);
                this.setState({
                    response: jsonData
                })
            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            })
    }

    testsList = () => {
        if (this.state.response) {
            const tests = this.state.response;
            return tests.map(item => (
                <ListGroup.Item action key={item.id} href={`#completetest/${item.id}`} state={item.id}>{item.testName}</ListGroup.Item>
            ));
        }
    };

    render() {
        return (
            <section className="section" id="showCandidateTests">
                <h1>Show tests</h1>
                <ListGroup>
                    {this.testsList()}
                </ListGroup>
            </section>
        )
    }
}

export default ShowCandidateTests;
