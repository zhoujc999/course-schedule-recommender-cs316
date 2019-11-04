import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Nav from 'react-bootstrap/Nav';
import './components/stylesheets/App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav className="Nav" defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <Nav.Link className="link" href="/"><i class="fas fa-home"></i> Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="link" href="/login"><i class="fas fa-sign-in-alt"></i> Log In</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="link" href="/signup"><i class="fas fa-user-plus"></i> Sign up</Nav.Link>
            </Nav.Item>
          </Nav>

          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
