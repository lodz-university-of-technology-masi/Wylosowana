import React, {Component} from 'react';
import {CSVLink} from "react-csv";
import Table from "react-bootstrap/Table";
import {Auth} from "aws-amplify";

class Export extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: JSON
        };
    }

    async componentDidMount() {
        fetch('https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        })
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                console.log(jsonData);
                this.setState({
                    response: jsonData
                })
            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            })
    }

    testsList = () => {
        if (this.state.response.Items) {
            const tests = this.state.response.Items;
            const {Parser} = require('json2csv');
            const fields = ['langs.lang', 'langs.questions.no', 'langs.questions.question', 'langs.questions.answers', 'langs.questions.correct', 'testName', 'id', 'candidate_logins'];
            const json2csvParser = new Parser({
                fields,
                unwind: ['langs', 'langs.questions', 'langs.questions.answers', 'langs.questions.correct', 'candidate_logins'],
                header: false
            });
            const headers = [
                "lang",
                'no',
                'question',
                'answers',
                'correct',
                'testName',
                'id',
                'candidate_logins'
            ];
            return tests.map(item => (
                <tr key={item.id}>
                    <th>
                        {item.testName}
                    </th>
                    <th>
                        <CSVLink data={json2csvParser.parse(item)}
                                 filename={`${item.testName}.csv`}
                                 className="btn btn-warning"
                                 headers={headers}>Export</CSVLink>
                    </th>
                </tr>
            ));
        }
    };

    render() {
        return (
            <React.Fragment>
                <h1>Export tests</h1>
                <Table>
                    <tbody>
                    {this.testsList()}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

export default Export;
