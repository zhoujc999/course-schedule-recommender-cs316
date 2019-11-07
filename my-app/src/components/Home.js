import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Plan from './Plan'
import Select from 'react-dropdown-select';
import './stylesheets/Home.css';

const options = [{value:'hello', label:'Hello'}, {value:'jpw', label:'jpw'}];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected:[],
      plans:[]
    };
    this.handleSearchPlans = this.handleSearchPlans.bind(this);
  }

  handleSearchPlans() {
    const { selected } = this.state;
    this.setState({plans:selected});
  }

  renderJumbo() {
    return (
      <div id="home">
        <Jumbotron className="jumbo">
          <h1 className="heading">Chart your four-year path here</h1>
          <div className="major-select">
            <Select
              multi
              clearable
              create
              options={options}
              values={this.state.selected}
              placeholder={"Select Plan(s)"}
              onChange={(values) => this.setState({selected:values})}
              onCreateNew={(value) => this.setState({selected:[...this.state.selected, value]})}
            />
            <Button
              type="submit"
              onClick={()=>this.handleSearchPlans()}
              variant="outline-info"
            >
              Search Academic Plans
            </Button>
          </div>
        </Jumbotron>
      </div>
    );
  }

  renderPlan() {
    const { plans } = this.state;
    //TODO logic to find relevant plans from database
    const planComponents = [];
    for (let i = 0; i < plans.length; i++) {
      planComponents.push(
        <Plan
          input={plans[i]}
          key={i}
        />);
    }
    return (
      <div className="plans">
        {planComponents}
      </div>
    );
  }

  render() {
    const { plans } = this.state;
    return (
      <div>
        {plans.length === 0 ? this.renderJumbo() : this.renderPlan()}
      </div>
    );
  }
}

export default Home;
