import React, {Component} from 'react';
import { CSVLink } from "react-csv";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

class CsvImportExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: JSON
        };
    }

    componentDidMount() {
        fetch('https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests')
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
            return tests.map(item => (
                <ListGroup.Item>
                    {item.testName}
                    <CSVLink data={item}
                             filename={`${item.testName}`}
                             className="btn btn-warning"
                             target="_blank">Export</CSVLink>
                </ListGroup.Item>
            ));
        }
    };

    render() {
        return (
            <section className="section auth">
                <Form>
                    <h1>Export tests</h1>
                    <ListGroup>
                        {this.testsList()}
                    </ListGroup>
                </Form>
            </section>
        )
    }
}

export default CsvImportExport;