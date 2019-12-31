import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Papa from 'papaparse';
import $ from "jquery";


class Import extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            data: [],
            newTest: null
        };

        this.getData = this.getData.bind(this);
    }

    getData(result) {
        this.setState({data: result.data});
    }

    getCsvData = () => {
        let json = Papa.parse(this.state.file, {
            header: true,
            complete: this.getData
        });

        console.log(json);
    };

    fileSelectedHandler = event => {
        this.setState({file: event.target.files[0]});
    };


    groupCsv = () => {
        let newQuestion = {
            on: this.state.data[0].on,
            question: ""
        };
        let listNewQuestion = [];
        for (let e of this.state.data) {
            if (newQuestion.on === e.on) {
                if (e.answers !== undefined) {
                    if (newQuestion.answers === undefined) {
                        newQuestion.answers = []
                    }
                    if (newQuestion.answers.indexOf(e.answers) === -1) {
                        newQuestion.answers.push(e.answers)
                    }
                }
                if (e.correct !== undefined) {
                    if (newQuestion.correct === undefined) {
                        newQuestion.correct = []
                    }
                    if (newQuestion.correct.indexOf(e.correct) === -1) {
                        newQuestion.correct.push(e.correct)
                    }
                }
            } else {
                newQuestion.question = e.question;
                listNewQuestion.push(newQuestion);
                newQuestion = {
                    on: e.on,
                    question: ""
                };
            }
        }
        newQuestion.question = this.state.data[this.state.data.length - 1].question;
        newQuestion.question = this.state.data[this.state.data.length - 1].question;
        listNewQuestion.push(newQuestion);
        let candidate_logins = [];
        for (let e in this.state.data) {
            if (candidate_logins.indexOf(e.candidate_logins) === -1) {
                candidate_logins.push(e.candidate_logins)
            }
            let newArray = {
                langs: [
                    {
                        lang: this.state.data[0].lang,
                        questions: listNewQuestion
                    }
                ],
                testName:  this.state.data[0].id.testName,
                id: this.state.data[0].id,
                candidate_logins: candidate_logins
            };

            $.ajax({
                type: "POST",
                dataType: "json",
                url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests',
                data: JSON.stringify(newArray),
                success: function (data, err) {
                    if (err)
                        console.log(err);
                    console.log(data);
                }
            });
        }
    };




        render()
        {
            return (
                <React.Fragment>
                    <h1>Import test</h1>
                    <input style={{display: 'none'}}
                           type="file"
                           onChange={this.fileSelectedHandler}
                           ref={fileInput => this.fileInput = fileInput}/>
                    <Button onClick={() => this.fileInput.click()} variant="primary" size="lg">
                        Select File
                    </Button>
                    <Button onClick={this.getCsvData} variant="primary" size="lg">
                        Import
                    </Button> <Button onClick={this.groupCsv} variant="primary" size="lg">
                        creteJson
                    </Button>
                </React.Fragment>
            )
        }
    }

    export
    default
    Import;
