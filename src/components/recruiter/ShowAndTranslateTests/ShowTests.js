import React, { Component } from 'react';
import Constants from "../../Constants";
import {Auth} from "aws-amplify";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Test from "./Test";
import TestObject from "./TestObject";
import TranslateTestObject from "./TranslateTestObject";

class ShowTests extends Component{

    constructor(props) {
        super(props)

        this.state = {
            tests: [],
            isOpen: false,
            choosenTest: {},
            isOpenNewTest: false,
        }

        this.getData = this.getData.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getNewData = this.getNewData.bind(this);
    }

    getData(val){
        this.toggleModal();
        this.setState({
            choosenTest: val
        });
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getNewData(val){
        this.toggleNewModal();
        this.setState({
            choosenTest: val
        });
    }

    toggleNewModal = () => {
        this.setState({
            isOpenNewTest: !this.state.isOpenNewTest
        });
    }


    async componentDidMount() {
        axios
            .get(Constants.PROXYURL + 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                }
            })
            .then((res) => {
                this.setState({
                    tests: res.data.Items.map(item => ({
                        candidate_logins: item.candidate_logins,
                        id: item.id,
                        langs: item.langs,
                        testName: item.testName
                    }))
                });
            });
    }

    render() {
        return (
            <section className="section auth" >
                <TestObject show={this.state.isOpen}
                            onClose={this.toggleModal}
                            choosenTest ={this.state.choosenTest}>
                </TestObject>
                <TranslateTestObject show={this.state.isOpenNewTest}
                            onClose={this.toggleNewModal}
                            choosenTest ={this.state.choosenTest}>
                </TranslateTestObject>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th scope="col">Test Name</th>
                            <th scope="col">PL language</th>
                            <th scope="col">ENG language</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tests.map((test) => (
                            <Test test={test} key={test.id} isOpen={this.getData} isOpenNewTest={this.getNewData} />
                    ))}
                    </tbody>
                </Table>
            </section>
        )
    }
}

export default ShowTests;