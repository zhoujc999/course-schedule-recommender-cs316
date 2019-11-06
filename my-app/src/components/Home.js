import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Plan from './Plan'
import Select from 'react-select';
import './stylesheets/Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {plan:[]};
    // this.state = {
      // plan:["Computer Science B.S."]
    // };
  }

  renderJumbo() {
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

  renderPlan() {
    const plan = this.state.plan;
    return (
      <div className="plans">
        <Plan input={plan} />
      </div>
    );
  }

  render() {
    const plan = this.state.plan;
    return (
      <div>
        {plan.length === 0 ? this.renderJumbo() : this.renderPlan()}
      </div>
    );
  }
}

export default Home;
