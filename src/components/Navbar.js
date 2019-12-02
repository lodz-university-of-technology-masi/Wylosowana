import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import {Auth} from 'aws-amplify';

export default class Navbars extends Component {
    handleLogOut = async event => {
        event.preventDefault();
        try {
            await Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#/">Wylosowana</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    {this.props.auth.isAuthenticated && this.props.auth.user && (
                        <p className="hello-username">Hello {this.props.auth.user.username}</p>
                    )}
                    {this.props.auth.isAuthenticated && this.props.auth.user && this.props.auth.user.attributes.profile === 'Recruiter' && (
                        <ButtonToolbar>
                            <Button variant="outline-info" href="#/createtest">Add Test</Button>
                            <div className="navbar-buttons-space"></div>
                        </ButtonToolbar>
                    )}
                    {this.props.auth.isAuthenticated && this.props.auth.user && this.props.auth.user.attributes.profile === 'Recruiter' && (
                        <ButtonToolbar>
                            <Button variant="outline-info" href="#/showtests">Show Tests</Button>
                            <div className="navbar-buttons-space"></div>
                        </ButtonToolbar>
                    )}
                    {this.props.auth.isAuthenticated && this.props.auth.user && this.props.auth.user.attributes.profile === 'Recruiter' && (
                        <ButtonToolbar>
                            <Button variant="outline-info" href="#/assigncandidatetotest">Assign users to test</Button>
                            <div className="navbar-buttons-space"></div>
                        </ButtonToolbar>
                    )}
                    {this.props.auth.isAuthenticated && this.props.auth.user && this.props.auth.user.attributes.profile === 'Candidate' && (
                        <ButtonToolbar>
                            <Button variant="outline-info" href="#/showtest">Show Test</Button>
                            <div className="navbar-buttons-space"></div>
                        </ButtonToolbar>
                    )}
                    {!this.props.auth.isAuthenticated && (
                        <ButtonToolbar>
                            <Button variant="outline-info" href="#/register">Register</Button>
                            <div className="navbar-buttons-space"></div>
                            <Button variant="outline-info" href="#/login">Log in</Button>
                        </ButtonToolbar>
                    )}
                    {this.props.auth.isAuthenticated && (
                        <Button onClick={this.handleLogOut} variant="outline-info" href="#/">Log out</Button>
                    )}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
