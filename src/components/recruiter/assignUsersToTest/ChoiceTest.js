import React, {Component} from "react";
import TestToAssign from "./TestToAssign";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";


class ChoiceTest extends Component {

    state = {
        textToSearch: ''
    };


    searchHandler = (e) => {
        this.setState({textToSearch: e.target.value})
    };

    render() {
        return (
            <div>
                <h1>Assign new users to test</h1>
                <Form.Group controlId="controlInputName">
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="Put text to search" onChange={this.searchHandler}/>
                </Form.Group>
                <Table striped bordered size="sm">
                    <tbody>
                    {this.props.tests.filter(searchingFor(this.state.textToSearch)).map((test) => (
                        <tr>
                            <TestToAssign key={test.id} test={test} selectTest={this.props.selectTest}/>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

ChoiceTest.propTypes = {
    selectTest: PropTypes.func.isRequired,
    tests: PropTypes.array.isRequired
};

function searchingFor(term) {
    return function (x) {
        if (x.testName === undefined) {
            return false;
        }
        return x.testName.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

export default ChoiceTest
