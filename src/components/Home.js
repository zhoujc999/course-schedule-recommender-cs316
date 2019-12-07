/*jshint esversion: 6 */
import './stylesheets/Home.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Plan from './Plan'
import Select from 'react-dropdown-select';
import React, { Component } from "react";
import axios from 'axios';

//Temporary plan options for user to select from
//TODO add logic to get options from backend (programs table)
//TODO add option to add new plan if logged in?

//const DUMMY_OPTIONS = [{value:'Culinary Arts', label:'Culinary Arts'}, {value:'Psychology', label:'Psychology'}];
const DUMMY_SEMESTERS = [
  { sem_num: 1, courses: [ {code: "ART101", name: "Intro to Art", taken_for: "Culinary Arts B.A."}, {code: "PASTA101", name: "Cooking101", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 2, courses: [ {code: "PASTA102", name: "The Art of Spaghetti", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 3, courses: [ {code: "PASTA201", name: "Macaroni Art", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 4, courses: [ {code: "PASTA305", name: "Linguini Painting", taken_for: "Culinary Arts B.A."}, {code: "PASTA255", name: "Tortellini Sculpting", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 5, courses: [ {code: "PASTA420", name: "Writing Orzo", taken_for: "Culinary Arts B.A."}, {code: "PASTA465", name: "Photographing Capellini", taken_for: "Culinary Arts B.A."} ] },
];
const DUMMY_PLANS = [{
  planInfo:
    {programs: [
      {name: "Culinary Arts", type: "B.A."},
      {name: "Astrophysics", type: "Ph.D."}
    ],
    user: 'joe24',
    description: "I'm Joe 24, this is my description, I am a DUMMY, FIX ME PLS"
  },
  semesters: DUMMY_SEMESTERS
}];


class Home extends Component {
  /* Homepage of app where users enter plans they want to see
  and then will return the course schedule plans that correspond
  to this */
  //Home creates multiple Plan components

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: [],
      plans: [],
      querySubmitted: false,
      error: null
    };
    this.handleSearchPlans = this.handleSearchPlans.bind(this);
  }

  componentDidMount() {
    console.log('1');
    this.setState({options: this.setOptions()});
  }

  setOptions() {
    console.log('2')
    const OPTIONS = [];
    console.log('3')
    const programUrl = "https://course-schedule-recommender.herokuapp.com/api/programs/";
    console.log('4')
    return axios.get(programUrl)
    .then(res => {
      console.log('5')
      console.log(res)
      return res.json()
    ).then(res => {
      console.log('6')
      console.log(res);
      const programs = JSON.parse(res);
      console.log('7')
      console.log(programs);
      for (let i = 0; i < programs.length; i++) {
        const program = {
          value: programs[i].name,
          label: programs[i].name
        };
        OPTIONS.push(program);
        console.log(program.label);
      }
      return OPTIONS;
    })
    .catch(err => {
      this.setState({error: err});
    });
    // return OPTIONS;
  }

  handleSearchPlans() {
    //Updates plans in state based on what is selected
    const { selected } = this.state;
    // TODO add logic to get real plan data based on selected
    // Below is DUMMY data that needs replacing
    const plans = DUMMY_PLANS.filter(plan => {
      return selected.some(s => {
        let p = plan.planInfo.programs.find(program => program.name === s.value);
        return p !== undefined
      })
    });
    this.setState({ plans, querySubmitted: true });
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
              options={this.options}
              values={this.state.selected}
              placeholder={"Select Plan(s)"}
              onChange={(values) => this.setState({ selected: values })}
              onCreateNew={(value) => this.setState({ selected: [...this.state.selected, value] })}
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

  renderEmptyPlans() {
    //Renders text when nothing found from query
    return (
      <div className="empty_plan_container">
        <div className="empty_plan_text">
          Oh no! No plans found for your query!
          <br />
          <br />
          Go Home to go back and make a new query
          <br />
          <br />
          Or Log In/Sign Up and add a plan
        </div>
      </div>
    )
  }

  renderPlans() {
    const { plans } = this.state;
    return (
      <div>
        {plans.length > 0 ? this.renderPlanComponents() : this.renderEmptyPlans()}
      </div>
    );
  }

  renderPlanComponents() {
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
          p_key={i}
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
    const { querySubmitted } = this.state;
    return (
      <div>
        {querySubmitted === false ? this.renderJumbo() : this.renderPlans()}
      </div>
    );
  }
}

export default Home;
