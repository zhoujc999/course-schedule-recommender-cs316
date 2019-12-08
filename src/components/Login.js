/*jshint esversion: 6 */
import React, { Component } from "react";
import { withFirebase } from './firebase';
import { Link, withRouter } from 'react-router-dom';
import Account from './Account';
// import { SignupLink } from './Signup';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './stylesheets/Login.css';

const LoginPage = () => (
  <div>
      <LoginForm />
      <SignupLink />
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netid: '',
      password: '',
      token: '',
      isLoggedIn: false,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleLogin(event) {
    const email = this.state.netid + "@duke.edu";
    this.props.firebase
      .doSignInWithEmailAndPassword(email, this.state.password)
      //reset the state after successful user registration
      .then(() => {
        this.setState({
          isLoggedIn: true,
          error: null
        });
        // TODO: change redirect URL after successful login
        if (this.state.isLoggedIn) {
          this.props.firebase.doRetrieveToken()
          .then((idToken) => {
            this.setState({token: idToken})
          })
          .catch(err => {
            this.setState({error: err});
          });
          // this.props.history.push('/account');
        }
      })
      .catch(err => {
        this.setState({error: err});
      });

      event.preventDefault();
  }

  render() {
    const isInvalid = this.state.netid === '' || this.state.password === '';

    if (this.state.isLoggedIn === true && this.state.token !== '') {
      return (
        <div>
          <Account netid={this.state.netid} token={this.state.token}  />
        </div>
      )
    }
    else {
      return (
        <div id="login">
          <Form>
            <label>Duke Email</label>
            <InputGroup className="mb-3 form-elem-top">
              <FormControl
                name="netid"
                value={this.state.netid}
                placeholder="Enter NetID"
                aria-label="your netid"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">@duke.edu</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <label>Password</label>
            <InputGroup className="mb-3 form-elem-top">
              <FormControl
                name="password"
                value={this.state.password1}
                placeholder="Enter password"
                aria-label="password"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
            </InputGroup>

            <Button
              className="form-elem-top"
              type="submit"
              disabled={isInvalid}
              onClick={(event)=>this.handleLogin(event)}
              variant="outline-info"
            >
              Log In
            </Button>
          </Form>

          {this.state.error && <p>{this.state.error.message}</p>}
        </div>
      );
    }
  }
}


const SignupLink = () => (
  <p id="signup-link">
    Don't have an account? <Link to={'/signup'}>Sign Up Here</Link>
  </p>
)

const LoginForm = withRouter(withFirebase(Login));

export default LoginPage;
export { LoginForm };
