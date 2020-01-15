import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';
import config from "../../config";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import Form from "react-bootstrap/Form";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    newPasswordCandidate: "",
    errors: {
      cognito: null,
      blankfield: false
    }
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
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const { username, newPasswordCandidate, password } = this.state;
    try {
      const authenticationData = {
        Username: username,
        Password: password,
      };
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

      const poolData = {
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
      };
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      const userData = {
        Username: username,
        Pool: userPool
      };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log('authenticateUser: ' + JSON.stringify(result));
        },
        onFailure: function (err) {
          console.log('onFailure: ' + JSON.stringify(err));
        },
        mfaRequired: function (codeDeliveryDetails) {
          console.log('mfaRequired: ' + codeDeliveryDetails);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          console.log('newPasswordRequired: ' + userAttributes + ' ' + requiredAttributes);
          cognitoUser.completeNewPasswordChallenge(newPasswordCandidate, userAttributes, this);
        }
      });

      const user = await Auth.signIn(username, password);
      console.log(user);
      if (user.getSignInUserSession()) {
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user);
        this.props.history.push("/");
      } else {
        const error = { blankfield: true };
        this.setState({
          errors: { ...this.state.errors, ...error }
        });
      }
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
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

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
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
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="newPasswordCandidate"
                  placeholder="New password"
                  value={this.state.newPasswordCandidate}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
              <Form.Text className="text-muted">
                Required with first candidate login otherwise leave empty.
              </Form.Text>
            </div>
            <div className="field">
              <p className="control">
                <a href="#/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default LogIn;