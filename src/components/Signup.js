/*jshint esversion: 6 */
import React, { Component } from "react";
import { withFirebase } from './firebase';
import { withRouter } from 'react-router-dom';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './stylesheets/Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netid: '',
      password1: '',
      password2: '',
      isAuthed: false,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSignup(event) {
    const email = this.state.netid + "@duke.edu";

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, this.state.password1)
      //reset the state after successful user registration
      .then(() => {
        this.setState({
          netid: '',
          password1: '',
          password2: '',
          isAuthed: true,
          error: null
        });
      // TODO: change redirect URL after successful signup
        if (this.state.isAuthed) {
          this.props.firebase.doRetrieveToken()
          .then((idToken) => {
            console.log(idToken);
          })
          .catch(err => {
            this.setState({error: err});
          });

          this.props.history.push("/account");
        }
      })
      .catch(err => {
        this.setState({error: err});
      });

      event.preventDefault();
  }

  render() {
    const isInvalid = this.state.password1 !== this.state.password2 ||
      this.state.password1 === '' || this.state.netid === '';

    return (
      <div id="signup">
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

          <label>Password (minimum of 6 characters)</label>
          <InputGroup className="mb-3 form-elem-top">
            <FormControl
              name="password1"
              value={this.state.password1}
              placeholder="Enter password"
              aria-label="password"
              aria-describedby="basic-addon2"
              onChange={this.handleChange}
            />
          </InputGroup>

          <InputGroup className = "form-elem">
            <FormControl
              name="password2"
              value={this.state.password2}
              placeholder="Confirm password"
              aria-label="password"
              aria-describedby="basic-addon2"
              onChange={this.handleChange}
            />
          </InputGroup>

          <Button
            className = "form-elem"
            type="submit"
            disabled={isInvalid}
            onClick={(event)=>this.handleSignup(event)}
            variant="outline-info"
          >
            Sign Up
          </Button>
        </Form>

        {this.state.error && <p>{this.state.error.message}</p>}
      </div>
    );
  }
}

const SignupForm = withRouter(withFirebase(Signup));

export default SignupForm;
