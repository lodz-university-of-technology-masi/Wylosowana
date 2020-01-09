import React, {Component} from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidationAddUser";
import {Auth} from 'aws-amplify';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import {cognitoidentityserviceprovider} from "./CognitoUsers";
import config from "../../config";
import uuid from 'uuid';
import Button from "react-bootstrap/Button";
import {params} from "../auth/CognitoUsers";

class AddDeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            profile: "Candidate",
            errors: {
                cognito: null,
                blankfield: false,
                passwordmatch: false
            },
            users: []
        };
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        cognitoidentityserviceprovider.listUsers(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log(data);
                this.setState({
                    users: data.Users
                });
            }
        });
    };

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        // Form validation
        this.clearErrorState();
        const error = Validate(event, this.state);
        if (error) {
            this.setState({
                errors: {...this.state.errors, ...error}
            });
        }

        // AWS Cognito integration here
        const {username, email, password, profile} = this.state;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email,
                    profile: profile,
                    name: profile
                }
            });
            console.log(signUpResponse);
            this.setState({
                username: "",
                email: "",
                password: "",
            });
            this.getUsers();
        } catch (error) {
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({
                errors:
                    {
                        ...this.state.errors,
                        cognito: error
                    }
            })
        }
    };

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    };

    deleteUser = (username) => {
        const params = {
            UserPoolId: config.cognito.USER_POOL_ID,
            Username: username
        };
        cognitoidentityserviceprovider.adminDeleteUser(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else {
                console.log(data);
                this.getUsers();
            }
        });
    };

    usersList = () => {
        if (this.state.users) {
            const users = this.state.users;
            return users.map(item => (
                <ListGroup.Item action key={uuid.v4()}>
                    {item.Username}
                    <Button className={"float-right"} id={uuid.v4()}
                            onClick={() => {
                                this.deleteUser(item.Username)
                            }}
                            name="deleteUser"
                            variant={"danger"}
                            size="sm">Delete</Button>
                </ListGroup.Item>
            ));
        }
    };

    render() {
        return (
            <section className="section user">
                <Container>
                    <Row>
                        <Col xs={5}>
                            <h1>Add User</h1>
                            <FormErrors formerrors={this.state.errors}/>

                            <form onSubmit={this.handleSubmit}>
                                <div className="field">
                                    <p className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            id="username"
                                            aria-describedby="userNameHelp"
                                            placeholder="Enter username"
                                            value={this.state.username}
                                            onChange={this.onInputChange}
                                        />
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control has-icons-left has-icons-right">
                                        <input
                                            className="input"
                                            type="email"
                                            id="email"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange={this.onInputChange}
                                        />
                                        <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.onInputChange}
                                        />
                                        <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <button className="button is-success">
                                            Add User
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </Col>
                        <Col xs={2}/>
                        <Col xs={5}>
                            <h1>Delete User</h1>
                            <ListGroup>
                                {this.usersList()}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default AddDeleteUser;
