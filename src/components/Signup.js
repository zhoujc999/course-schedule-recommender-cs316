/*jshint esversion: 6 */
import React, { Component } from "react";
import { withFirebase } from './firebase';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Account from './Account';

import './stylesheets/Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netid: '',
      password1: '',
      password2: '',
      isAuthed: false,
      error: null,
      token: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyNetId = this.verifyNetId.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  verifyNetId(event) {
    const netid = this.state.netid;

    const url = 'https://api.colab.duke.edu/identity/v1/' + netid;
    const key = {
      headers: {
        'x-api-key': 'course-schedule-recommender'
      }
    };

    axios.get(url, key)
    //valid netid - create new user and go to account page
    .then(res => {
      this.handleSignup(netid);
    })
    //invalid netid - set error message
    .catch(err => {
      const error = {
        message: 'Invalid NetID'
      }
      this.setState({error: error});
    });

    event.preventDefault();
  }

  handleSignup(netid) {
    const email = netid + "@duke.edu";

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, this.state.password1)
      //reset the state after successful user registration
      .then(() => {
        this.setState({
          isAuthed: true,
          error: null
        });
      // TODO: change redirect URL after successful signup
        if (this.state.isAuthed) {
          this.props.firebase.doRetrieveToken()
          .then((idToken) => {
            this.setState({token: idToken})
          })
          .catch(err => {
            this.setState({error: err});
          });
        }
      })
      .catch(err => {
        this.setState({error: err});
      });
  }

  render() {
    const isInvalid = this.state.password1 !== this.state.password2 ||
      this.state.password1 === '' || this.state.netid === '';

    if (this.state.isAuthed === true && this.state.token !== '') {
      return (
        <div>
          <Account netid={this.state.netid} token={this.state.token}  />
        </div>
      )
    }

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
            onClick={(event)=>this.verifyNetId(event)}
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
