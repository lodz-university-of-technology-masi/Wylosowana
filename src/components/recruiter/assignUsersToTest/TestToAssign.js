import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";

class TestToAssign extends Component {

    render() {
        const {id} = this.props.test;
        return (
            <React.Fragment>
                <th>
                    {this.props.test.testName} </th>
                <th>
                    <div className="float-right">
                    <Button id="selectButton"
                            name="selectTest" onClick={this.props.selectTest.bind(this, id)}
                            variant="success"
                            size="sm">Add users</Button>
                    </div>
                </th>
            </React.Fragment>
        );
    }
}

TestToAssign.propTypes = {
    test: PropTypes.object.isRequired,
    selectTest: PropTypes.func.isRequired
};

export default TestToAssign;


