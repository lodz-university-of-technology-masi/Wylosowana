import React, {Component} from 'react';
import $ from "jquery";
import axios from 'axios';
import App from "../../../App";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

class TestToAssign extends Component {

    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.test.selected ?
                'line-through' : 'none'
        }
    }


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
                            size="sm">Add Users</Button>
                    </div>
                </th>
            </React.Fragment>
        );
    }
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
};

TestToAssign.propTypes = {
    test: PropTypes.object.isRequired,
    selectTest: PropTypes.func.isRequired
};

export default TestToAssign;


