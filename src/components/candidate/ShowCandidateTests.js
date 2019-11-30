import React, {Component} from 'react';
import ListGroup from "react-bootstrap/ListGroup";

class ShowCandidateTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: JSON
        };
    }

    componentDidMount() {
        fetch(`https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests/candidates/${this.props.auth.user.username}`)
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
        if (this.state.response.Items) {
            const tests = this.state.response.Items;
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
