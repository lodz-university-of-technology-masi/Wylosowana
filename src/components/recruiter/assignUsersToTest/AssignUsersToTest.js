import React, {Component} from 'react';
import axios from 'axios';
import ChoiceTest from "./ChoiceTest";
import uuid from 'uuid'
import ChoiceUsers from "./ChoiceUsers";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import {Auth} from "aws-amplify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {listCandidates} from "../../auth/CognitoUsers";
import Modal from "react-bootstrap/Modal";

class AssignUsersToTest extends Component {

    state = {
        tests: [],
        temp: [],
        modifiedTest: {},
        visibility: true,
        users: [],
        selectedUsers: [],
        showSuccess: false,
        showError: false
    };

    async componentDidMount() {
        axios
            .get( 'https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests', {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                    }
                }
            )
            .then((res) => {
                this.setState({
                    tests: res.data.map(item => ({
                        candidateLogins: item.candidateLogins,
                        id: item.id,
                        langs: item.langs,
                        testName: item.testName
                    }))
                });
            });

        listCandidates().then((res) => {
            this.setState({
                users: res.data.map(item => ({
                    userName: item.username,
                    selected: false,
                    id: uuid.v4()
                }))
            });
        });
    };

    selectTest = (id) => {
        let toRemove =[...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.candidateLogins})[0];
                this.setState({
                    modifiedTest: {
                        candidateLogins: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.candidateLogins})[0],
                        id: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.id})[0],
                        langs: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.langs})[0],
                        testName: [...this.state.tests.filter(user => {return (user.id===id)})].map(user => {return user.testName})[0]
                    }
                });
        this.setState({visibility: false});
        if(toRemove!==undefined) {
            this.setState({
                users: this.state.users.filter((el) => {
                    return toRemove.indexOf(el.userName) < 0;
                })
            })
        }
    };

    modifyTest = () => {
        this.setState({
            modifiedTest: {
                candidateLogins: [...this.state.modifiedTest.candidateLogins,...this.state.selectedUsers],
                id: this.state.modifiedTest.id,
                langs: this.state.modifiedTest.langs,
                testName: this.state.modifiedTest.testName
            }}, () => {this.handleSubmit()}
        );
    };

    createListSelectedUsers = () => {
        this.setState({
            selectedUsers: [...this.state.users.filter(user => {return (user.selected)}).map(e => e.userName)]
        })
    };

    selectUser = (id) => {
        this.setState({
            users: this.state.users.map(user => {
                if (user.id === id) {
                    user.selected = !user.selected
                }
                return user
            })
        });
        this.createListSelectedUsers();
    };

    handleSubmit = async () => {
        const validateTest = {
            "candidateLogins": this.state.modifiedTest.candidateLogins,
        };

        $.ajax({
            type: "PUT",
            dataType: "json",
            url: `https://nvdj7sjxsi.execute-api.us-east-1.amazonaws.com/dev/tests/${this.state.modifiedTest.id}`,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
            data: JSON.stringify(validateTest),
            success: function () {
                this.setState({
                    showSuccess: true,
                });
            }.bind(this),
            error: function () {
                this.setState({
                    showError: true,
                });
            }.bind(this),
        });
    };

    handleCloseSuccess = () => {
        window.location.reload();
    };

    handleCloseError = () => {
        window.location.reload();
    };

    render() {
        return (
            <section className="section assignUsersToTests">
                {this.state.visibility ?
                    <ChoiceTest tests={this.state.tests} selectTest={this.selectTest}/>
                    :
                    <div>
                        <h1>Choose users for test {this.state.modifiedTest.testName}</h1>
                        <ChoiceUsers users={this.state.users} selectUser={this.selectUser}/>
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id="tooltip">Click to confirm your choice. Chosen users will
                                            now see this test.</Tooltip>}>
                            <span className="d-inline-block">
                                <Button id="selectButton"
                                        name="selectTest" onClick={this.modifyTest}
                                        variant="success">Submit</Button>
                            </span>
                        </OverlayTrigger>
                    </div>}

                <Modal show={this.state.showSuccess} onHide={this.handleCloseSuccess} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Users assign successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Users can solve this test.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleCloseSuccess}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showError} onHide={this.handleCloseError} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign failed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please try again.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleCloseError}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>
        )
    }
}

export default AssignUsersToTest;
