import React from 'react';
import PropTypes from 'prop-types';
import {backdropStyle, modalStyle} from "./ModalSetting";
import Constants from "../../Constants";

const renederQuestion = [];

class TestObject extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            synom: '',
            synomed: ''
        };

    }

    getQuestions = () => {
        return this.props.choosenTest.langs.filter((x) =>
            x.lang === this.props.choosenTest.choosen)[0]
            .questions
            .map((x) => x)
    };

    renderAnswerIfPresent = () => {
        if (!renederQuestion.length)
            this.getQuestions().forEach((x) => {
                if(x.answers !== null)
                    renederQuestion.push({question: x.question, answers: x.answers});
                else
                    renederQuestion.push({question: x.question, answers: []});
            })
    };


    handleSynom = (textToSynome, textAfterSynome) => {
        this.setState({
            synom: textAfterSynome,
            synomed: textToSynome
        })
    };

    claerSynom = () => {
        this.setState({
            synom: '',
            synomed: ''
        })
    };


    getSynonim = () => {

        const self = this;
        let textToSynome = '';
        let textAfterSynome = '';
        const highlight = window.getSelection();
        if (highlight.toString() !== "") {
            textToSynome = window.getSelection().toString();
            if (this.props.choosenTest.choosen === 'EN') {
                Constants.DICTIONARY.lookup(textToSynome, 'en-en', function (err, res) {
                    textAfterSynome = !res.def.length ? textToSynome : res.def[0].tr[0].text;
                    self.handleSynom(textToSynome, textAfterSynome);
                })
            } else {
                Constants.DICTIONARY.lookup(textToSynome, 'pl-ru', function (err, res) {
                    textAfterSynome = !res.def.length ? textToSynome : res.def[0].tr[0].text;
                    Constants.TRANSLATE.translate(textAfterSynome, {to: 'pl'}, (err, res) => {
                        textAfterSynome = err ? textToSynome : res.text;
                        self.handleSynom(textToSynome, textAfterSynome);
                    })
                })
            }
        }

    };


    clearTables = () => {
        renederQuestion.length = 0
        this.claerSynom();
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

                            {renederQuestion.map((x, ind1) =>
                                <p key={ind1}>
                                    {x.question} <br/>
                                    {x.answers.map((y, ind) => <b key={ind}> {y + ' '} </b>)}
                                </p>)}

                        </div>
                        <button onClick={() => {
                            this.props.onClose();
                            this.clearTables();
                        }}>
                            Close
                        </button>
                        <button onMouseOver={this.getSynonim} onMouseOut={this.claerSynom} >
                            Check synonim
                        </button>
                        {this.state.synom !== '' ?
                            <p> {'synom ' + this.state.synomed + ' - ' + this.state.synom }</p>: ''}
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