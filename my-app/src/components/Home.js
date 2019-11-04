import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import './stylesheets/Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="home">
        <Jumbotron className="jumbo">
          <h1 className="heading">Chart your four-year path here</h1>
          <div className="major-select">
            <Select placeholder="Enter Major(s)" options={['hello']} />
          </div>
          <Button type="submit" variant="outline-info">Search Academic Plans</Button>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
