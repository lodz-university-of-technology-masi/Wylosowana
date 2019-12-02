import React, {Component} from 'react';
import $ from "jquery";
import axios from 'axios';
import App from "../../../App";
import PropTypes from 'prop-types'

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
        const { id } = this.props.test;
        return (
            <div style={this.getStyle()}>
                <p>
                    {this.props.test.testName}
                    <button onClick={this.props.selectTest.bind(this,id)} style={btnStyle}>Add Users</button>
                </p>
            </div>
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
}

TestToAssign.propTypes = {
    test: PropTypes.object.isRequired,
    selectTest: PropTypes.func.isRequired
};

export default TestToAssign;


