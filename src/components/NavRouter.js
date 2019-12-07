import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Nav from 'react-bootstrap/Nav';
import Account from './Account';
import './stylesheets/App.css';

//TODO: Check if user is logged in, change options accordingly
//If user logged in: Home, Account, Log Out
//If user not logged in: Home, Log In, Sign Up

//TODO: ADD LOG OUT FUNCTION

class NavRouter extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav className="Nav" defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <Nav.Link className="link" href="/"><i className="fas fa-home"></i> Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="link" href="/login"><i className="fas fa-sign-in-alt"></i> Log In</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="link" href="/signup"><i className="fas fa-user-plus"></i> Sign up</Nav.Link>
            </Nav.Item>
          </Nav>

          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/account" component={Account}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default NavRouter;
