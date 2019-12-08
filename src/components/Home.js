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
// const DUMMY_PLANS = [{
//   user: 'joe24',
//   description: "I'm Joe 24, this is my description, I am a DUMMY, FIX ME PLS",
//   planInfo: {
//     programs: [
//       {name: "Culinary Arts", type: "B.A."},
//       {name: "Astrophysics", type: "Ph.D."}
//     ],
//   },
//   semesters: DUMMY_SEMESTERS
// }];


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
    this.getOptions().then(res => {
      this.setState({options: res});
    })
  }

  getOptions() {
    const programUrl = "https://course-schedule-recommender.herokuapp.com/api/programs/";
    return axios.get(programUrl)
    .then(res => {
      const programs = [...new Set(res.data.map(val => val.name))];
      programs.sort();
      return programs.map(p => ({value: p, label: p}));
    })
    .catch(err => {
      this.setState({error: err});
    });
  }

  getPlans() {
    const selected = this.state.selected.map(p => p.value);
    for (let i = 0; i < selected.length; i++) {
      selected[i] = (selected[i].indexOf(" ") === -1)? selected[i] : selected[i].replace(/\s/gi, "%20");
    }

    const planUrl = "https://course-schedule-recommender.herokuapp.com/api/plans?programs=";
    console.log(planUrl+selected.join(","));
    axios.get(planUrl + selected.join(","))
    .then(res => {
      return res.data.map(plan => ({
        user: plan.netid,
        description: plan.Description,
        planInfo: {
          //TODO: change the attribute based on the actual response body
          programs: plan.programs.map(val => ({name: val.name, type: val.type}))
        },
        semesters: plan.semesters
      }));
    })
    .catch(err => {
      this.setState({error: err});
    });
  }

  handleSearchPlans() {
    //Updates plans in state based on what is selected
    const { selected } = this.state;
    this.getPlans().then(res => {
      // TODO add logic to get real plan data based on selected
      // Below is DUMMY data that needs replacing
      const plans = res.filter(plan => {
        return selected.some(s => {
          let p = plan.planInfo.programs.find(program => program.name === s.value);
          return p !== undefined
        })
      });
      this.setState({ plans, querySubmitted: true });
    })
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
              options={this.state.selected.length >= 3 ? this.state.selected : this.state.options}
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
    const { querySubmitted, options } = this.state;
    return (
      <div>
        {options.length > 0
          ? (querySubmitted === false ? this.renderJumbo() : this.renderPlans())
          : (<div> Loading... </div>)
        }
      </div>
    );
  }
}

export default Home;
