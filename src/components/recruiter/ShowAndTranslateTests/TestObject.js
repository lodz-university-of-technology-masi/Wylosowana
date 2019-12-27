import React from 'react';
import PropTypes from 'prop-types';
import {backdropStyle, modalStyle} from "./ModalSetting";

const renederQuestion = []

class TestObject extends React.Component {

    getQuestions = () => {
            return  this.props.choosenTest.langs.filter((x) =>
                x.lang === this.props.choosenTest.choosen)[0].
            questions.
            map((x) => x)
    };

    renderAnswerIfPresent = () => {
        this.getQuestions().map((x) => {
            for( let prop in x) {
                if (prop === "answers") {
                    renederQuestion.push({question: x.question, answers: x.answers});
                    break;
                }
                else {
                    renederQuestion.push({question: x.question, answers: []})
                    break;
                }
            }
        })
    };

    clearTables = () => {
        renederQuestion.length = 0
    }

    render() {

        if (!this.props.show) {
            return null;
        }

        this.renderAnswerIfPresent();

        return (
            <React.Fragment>
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <h3> {this.props.choosenTest.testName} </h3>
                        <h4> Questions: </h4>
                        <div>

                            { renederQuestion.map((x) =>
                                <p key={x.question}>
                                    {x.question} <br/>
                                    {x.answers.map((y) => <a key={y}> {y + ' '} </a>)}
                                </p> )}

                        </div>
                            <button onClick={() => {this.props.onClose(); this.clearTables();}}>
                                Close
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

TestObject.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
};


export default TestObject;