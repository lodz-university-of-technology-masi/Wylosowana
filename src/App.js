import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import Welcome from './components/auth/Welcome';
import CreateTest from './components/recruiter/CreateTest';
import ShowCandidateTests from './components/candidate/ShowCandidateTests';
import {Auth} from 'aws-amplify';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowTests from "./components/recruiter/ShowTests";
import CompleteTest from "./components/candidate/CompleteTest";
import AssignUsersToTest from "./components/recruiter/assignUsersToTest/AssignUsersToTest";

library.add(faEdit);

class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
              <Route exact path="/createtest" render={(props) => <CreateTest {...props} auth={authProps} />} />
              <Route exact path="/showtests" render={(props) => <ShowTests {...props} auth={authProps}/>}/>
              <Route exact path="/showcandidatetests" render={(props) => <ShowCandidateTests {...props} auth={authProps}/>}/>
              <Route exact path="/completetest/:id" render={(props) => <CompleteTest {...props} auth={authProps}/>}/>
              <Route exact path="/assigncandidatetotest" render={(props) => <AssignUsersToTest {...props} auth={authProps}/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
