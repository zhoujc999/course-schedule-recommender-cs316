import './stylesheets/Home.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Plan from './Plan'
import Select from 'react-dropdown-select';
import React, { Component } from "react";

//Temporary plan options for user to select from
//TODO add logic to get options from backend (programs table)
//TODO add option to add new plan if logged in?
const DUMMY_OPTIONS = [{value:'hello', label:'Hello'}, {value:'jpw', label:'jpw'}];

class Home extends Component {
  /* Homepage of app where users enter plans they want to see
  and then will return the course schedule plans that correspond
  to this */
  //Home creates multiple Plan components

  constructor(props) {
    super(props);
    this.state = {
      selected:[],
      plans:[]
    };
    this.handleSearchPlans = this.handleSearchPlans.bind(this);
  }

  handleSearchPlans() {
    //Updates plans in state based on what is selected
    const { selected } = this.state;
    this.setState({plans:selected});
  }

  renderJumbo() {
    //Renders default text, select, and button
    return (
      <div id="home">
        <Jumbotron className="jumbo">
          <h1 className="heading">Chart your four-year path here</h1>
          <div className="major-select search-bar">
            <Select
              multi
              clearable
              create
              options={DUMMY_OPTIONS}
              values={this.state.selected}
              placeholder={"Select Plan(s)"}
              onChange={(values) => this.setState({selected:values})}
              onCreateNew={(value) => this.setState({selected:[...this.state.selected, value]})}
            />
            </div>
            <div className="btn">
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

  renderPlans() {
    //Renders plans based on what user selected in state
    const { plans } = this.state;
    /* TODO logic to find relevant plans from database
    Below code renders a plan for each input, but later on
    we want to find and order the plans based on more factors
    (plus needs to handle plans with multiple tags) */
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
    //When plans is empty, display jumbotron, otherwise render the plans
    const { plans } = this.state;
    return (
      <div>
        {plans.length === 0 ? this.renderJumbo() : this.renderPlans()}
      </div>
    );
  }
}

export default Home;
