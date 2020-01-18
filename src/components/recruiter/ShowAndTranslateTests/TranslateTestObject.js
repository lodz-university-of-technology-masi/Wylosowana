import React from 'react';
import PropTypes from 'prop-types';
import {backdropStyle, modalStyle} from "./ModalSetting";
import Constants from "../../Constants";
import $ from "jquery";
import {Auth} from "aws-amplify";

const renederQuestion = [];

class TranslateTestObject extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }


    async componentDidUpdate() {
        if (this.props.show && this.state.data.length === 0) {
            this.renderAnswerIfPresent();
            await this.translateData();
        }
    }

    getQuestions = () => {
        return this.props.choosenTest.langs.filter((x) =>
            x.lang === this.props.choosenTest.choosen)[0].questions.map((x) => x)
    };

    renderAnswerIfPresent() {
        this.getQuestions().forEach((x) => {
            for (let prop in x) {
                if (prop === "answers") {
                    renederQuestion.push({question: x.question, answers: x.answers});
                    break;
                } else {
                    renederQuestion.push({question: x.question, answers: []});
                    break;
                }
            }
        })
        return;
    };

    translateData = async () => {
        const detectLanguage = this.props.choosenTest.choosen === 'EN' ? 'pl' : 'en';

        const promisesQuestions = [];
        const promisesAnswers = [];
        for (const x of renederQuestion) {
            promisesQuestions.push(new Promise((resolve, reject) => {
                return Constants.TRANSLATE.translate(x.question, {to: detectLanguage}, (err, res) => {
                    resolve(res.text)
                })
            }));
            promisesAnswers.push(new Promise((resolve, reject) => {
                const tempNestedTable = [];
                for (const y of x.answers) {
                    tempNestedTable.push(new Promise((resolve1, reject1) => {
                        Constants.TRANSLATE.translate(y, {to: detectLanguage}, (err, res) => {
                            resolve1(res.text)
                        })
                    }))
                }
                return resolve(Promise.all(tempNestedTable).then(answers => answers.flat()));
            }))
        }
        Promise.all(promisesQuestions).then((questions => {
            Promise.all(promisesAnswers).then(answers => {
                answers.forEach( (answArr, index) => {
                        this.setState({
                            data: [...this.state.data, {question: questions[index], answers: answArr}]
                        });
                })
            })
        }))
    };


    clearTables = () => {
        renederQuestion.length = 0;
        this.setState({
            data: []
        });
    };

    handleSubmit = async () => {

        const validateTestQuestions = this.state.data.map((validateQuestion, ind ) =>{
            if( validateQuestion.answers.length )
                return { answers: validateQuestion.answers, no: ind, question: validateQuestion.question.toString(), correct: this.getQuestions()[ind].correct}
            else
                return {question: validateQuestion.question.toString(), no: ind}
        });

        this.props.choosenTest.langs.push({lang: this.props.choosenTest.choosen === 'EN' ? 'PL' : 'EN', questions: validateTestQuestions});

        const validateTest = {
            "translation": {lang: this.props.choosenTest.choosen === 'EN' ? 'PL' : 'EN', questions: validateTestQuestions}
        };

        $.ajax({
            type: "PUT",
            dataType: "json",
            url: `https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests/translation/${this.props.choosenTest.id}`,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
            data: JSON.stringify(validateTest),
            success: function (data, err) {
                if (err)
                    console.log(err);
                console.log(data);
            }
        });

    }

    render() {

        if (!this.props.show) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <h3> {this.props.choosenTest.testName} </h3>
                        <h4> Questions: </h4>
                        <div>
                            {this.state.data.map((x, i) =>
                                <p key={i}> {x.question} <br/>
                                    {x.answers.map((y, i) => <b key={i}> {y + '  '} </b>)}
                                </p>
                            )}
                        </div>
                        <button onClick={() => {
                            this.props.onClose();
                            this.clearTables();
                        }}>
                            Close
                        </button>

                        <button onClick={async () => {
                            await this.handleSubmit();
                            this.props.onClose();
                            this.clearTables();
                        }}>
                            Accept
                        </button>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


TranslateTestObject.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
};


export default TranslateTestObject;
