import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import './stylesheets/Home.css';

class Home extends Component {
  render() {
    return (
      <div id="home">
      <Jumbotron className="jumbo">
        <h1 className="heading">Chart your four-year path here</h1>
        <Form className="form">
          <Form.Control type="text" placeholder="Enter your major(s)"></Form.Control>
        </Form>
        <Button type="submit" variant="outline-info">Search Academic Plans</Button>
      </Jumbotron>
      </div>
    );
  }
}

export default Home;
