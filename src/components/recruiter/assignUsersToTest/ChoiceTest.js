import React, {Component} from "react";
import TestToAssign from "./TestToAssign";
import PropTypes from "prop-types";


class ChoiceTest extends Component{

    state = {
        textToSearch: ''
    };


    searchHandler = (e) => {
        this.setState({textToSearch: e.target.value })
    };

    render() {
        return (
            <div>
                <h1>Assign new users to test</h1>
                <form>
                    {'Search: '} <input type={"text"} onChange={this.searchHandler} placeholder={"Put text to search"}/>
                </form>
                <p>
                    { this.props.tests.filter(searchingFor(this.state.textToSearch)).map((test) => (
                        <TestToAssign key={test.id} test={test}  selectTest={this.props.selectTest}/>
                    ))}
                </p>
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
        if(x.testName === undefined) {
            return false;
        }
        return x.testName.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

export default ChoiceTest
