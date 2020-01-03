import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Papa from 'papaparse';
import $ from "jquery";
import Modal from "react-bootstrap/Modal";

class Import extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            data: [],
            newTest: null,
            showSuccess: false,
            showError: false,
        };

        this.getData = this.getData.bind(this);
    }

    getData(result) {
        this.setState({data: result.data}, () => {
            this.groupCsv()
        });
    }

    getCsvData = () => {
        Papa.parse(this.state.file, {
            header: true,
            complete: this.getData
        });
    };

    fileSelectedHandler = event => {
        this.setState({file: event.target.files[0]}, () => {
            this.getCsvData()
        });
    };


    groupCsv = () => {
        let no = parseInt(this.state.data[0].no, 10);
        let newQuestion = {
            no: no,
            question: ""
        };
        let listNewQuestion = [];
        for (let e of this.state.data) {
            if (newQuestion.no === parseInt(e.no, 10)) {
                if (e.answers !== "") {
                    if (newQuestion.answers === undefined) {
                        newQuestion.answers = []
                    }
                    if (newQuestion.answers.indexOf(e.answers) === -1) {
                        newQuestion.answers.push(e.answers)
                    }
                }
                if (e.correct !== "") {
                    if (newQuestion.correct === undefined) {
                        newQuestion.correct = []
                    }
                    if (newQuestion.correct.indexOf(e.correct) === -1) {
                        newQuestion.correct.push(e.correct)
                    }
                }
            } else {
                let no = parseInt(e.no, 10);
                newQuestion.question = e.question;
                listNewQuestion.push(newQuestion);
                newQuestion = {
                    no: no,
                    question: ""
                };
            }
        }
        newQuestion.question = this.state.data[this.state.data.length - 1].question;
        newQuestion.question = this.state.data[this.state.data.length - 1].question;
        listNewQuestion.push(newQuestion);
        let candidate_logins = [];
        for (let e of this.state.data) {
            if (candidate_logins.indexOf(e.candidate_logins) === -1 && e.candidate_logins !== "") {
                candidate_logins.push(e.candidate_logins)
            }
            let newArray = {
                langs: [
                    {
                        lang: this.state.data[0].lang,
                        questions: listNewQuestion
                    }
                ],
                testName: this.state.data[0].testName,
                candidate_logins: candidate_logins
            };

            this.setState({newTest: newArray})
        }
    };

    sendTest = () => {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests',
            data: JSON.stringify(this.state.newTest),
            success: function () {
                this.setState({
                    file: null,
                    data: [],
                    newTest: null,
                    showSuccess: true,
                    showError: false,
                });
            }.bind(this),
            error: function () {
                this.setState({
                    file: null,
                    data: [],
                    newTest: null,
                    showSuccess: false,
                    showError: true,
                });
            }.bind(this),
        });
    };

    handleCloseSuccess = () => this.setState({showSuccess: false});

    handleCloseError = () => this.setState({showError: false});

    render() {
        return (
            <React.Fragment>
                <h1>Import test</h1>
                <input style={{display: 'none'}}
                       type="file"
                       onChange={this.fileSelectedHandler}
                       ref={fileInput => this.fileInput = fileInput}/>
                <div>
                    <Button onClick={() => this.fileInput.click()} variant="primary" size="lg">
                        Select File
                    </Button>
                </div>

                {this.state.file ?
                    <div className="formQuestions"><label>Chosen File: {this.state.file.name}</label></div> : null}
                {this.state.newTest ?
                    <div><Button onClick={this.sendTest} variant="success" size="lg">
                        Import
                    </Button></div>
                    : null
                }

                <Modal show={this.state.showSuccess} onHide={this.handleCloseSuccess} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Test imported successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your test is now added to the pool of tests.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleCloseSuccess}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showError} onHide={this.handleCloseError} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Import failed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Check if your test has correct scheme to it.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleCloseError}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        );
    }
}

export default Import;
