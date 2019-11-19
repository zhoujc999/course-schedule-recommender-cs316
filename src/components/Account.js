/*jshint esversion: 6 */
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Select from 'react-dropdown-select';
import ReactTooltip from 'react-tooltip';
import Form from 'react-bootstrap/Form';
import './stylesheets/Account.css';

const DUMMY_ACCOUNT_INFO = {netid: "joe24", bio: "A pasta expert"};
const DUMMY_COMPLETED = [{name: "Culinary Arts", type: "B.A."}, {name: "Astrophysics", type: "Ph.D."}];
const DUMMY_SEMESTERS = [
  { sem_num: "1", courses: [ {code: "ART101", name: "Art101", taken_for: "Culinary Arts B.A"}, {code: "PASTA101", name: "Cooking101", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "2", courses: [ {code: "PASTA102", name: "The Art of Spaghetti", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "3", courses: [ {code: "PASTA201", name: "Macaroni Art", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "4", courses: [ {code: "PASTA305", name: "Linguini Painting", taken_for: "Culinary Arts B.A"}, {code: "PASTA255", name: "Tortellini Sculpting", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "5", courses: [ {code: "PASTA420", name: "Writing Orzo", taken_for: "Culinary Arts B.A"}, {code: "PASTA465", name: "Phtographing Capellini", taken_for: "Culinary Arts B.A"} ] },
];
const DUMMY_TYPES = [{value: "B.A.", label: "B.A."}, {value: "B.S.", label: "B.S."}, {value: "Concentration", label: "Concentration"}, {value: "Ph.D.", label: "Ph.D."}, {value: "Minor", label: "Minor"}];

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: {netid: "", bio: ""}, //User ID, email, bio -> Student DB
      completed: [], //Programs completed -> Completed + Program DB
      semesters: [], //Sems of classes completed -> Semester + Class DB
      newAccountInfo: {netid: "", bio: ""},
      newCompleted: [],
      newSemesters: [],
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleBioSubmit = this.handleBioSubmit.bind(this);
  }

  handleUpdate() {
    //TODO: Send updated info to backend
    console.log('updating backend');
    console.log(this.state);
  }

  handleBioSubmit(e) {
    //Send to state and then TODO: send updated info to backend
    e.preventDefault();
    if (e.target[0].value.length > 0) {
      this.setState({accountInfo:
        {netid: this.state.accountInfo.netid, bio: e.target[0].value}
      }, () => {
        this.handleUpdate(); //TODO: CHANGE TO DO UPDATING HERE
      });
    }
  }

  handleProgramUpdate(event) {
    //Update information on page
    //Send to state and then send updated info to backend
    event.preventDefault();
    console.log(this.state);
  }

  handleProgNameChange(event) {
    console.log(event);
  }

  handleProgTypeChange(event) {
    console.log(event);
  }

  componentDidMount() {
    //TODO: Get existing data from database, if exists and put into state
    this.setState({
      accountInfo: DUMMY_ACCOUNT_INFO,
      completed: DUMMY_COMPLETED,
      semesters: DUMMY_SEMESTERS
    });
  }

  renderAccountInfo() {
    const { accountInfo } = this.state;
    console.log(accountInfo.bio)
    const bioPlaceholder = 'Enter a brief bio or description about you and ' +
      'your plans.\nEx. "Interested in data science/Norse literature/public ' +
      'policy/etc."';
    return (
      <div className="account_info">
        <div className="account_user">
          <div className="account_netid">
            Username: { accountInfo.netid }
          </div>
          <div className="account_email">
            Email: { accountInfo.netid + "@duke.edu" }
          </div>
        </div>
        <div className="account_bio">
          <Form onSubmit={this.handleBioSubmit} className="bio_form">
            <Form.Group controlId="formBio" role="form">
              <Form.Label>Description</Form.Label>
              <div className="fas fa-question-circle" data-tip data-for="acc_bio" />
              <ReactTooltip id="acc_bio" place="right" type="info" effect="float">
                {"A brief bio or description about you and your plans."}
                <br/>
                {'Ex. "Interested in data science/Norse literature/public policy/etc."'}
              </ReactTooltip>
              <Form.Control
                as="textarea"
                defaultValue={ accountInfo.bio }
                placeholder={ bioPlaceholder }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Description
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  renderEmptyCompleted() {
    return (
      <div className="completed_empty">
        Completed empty
      </div>
    );
  }

  renderCompleted() {
    const { completed } = this.state;
    const programs = [];
    for (let i = 0; i < completed.length; i++) {
      programs.push(
        <div className="completed_program">
          <form>
            <label>
              Program:
              <input
                type="text"
                placeholder={completed[i].name}
                onChange={this.handleProgNameChange}
              />
            </label>
            <label>
              Type:
              <Select
                clearable
                create
                options={DUMMY_TYPES}
                value={completed[i].type}
                placeholder={completed[i].type}
                onChange={(value) => this.state.completed[i].type = value}
                onCreateNew={(value) => this.state.completed[i].type = value}
              />
            </label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                this.setState({completed: this.state.completed.filter((v, ind) => ind !== i)})
              }
            >
              Remove
            </Button>
          </form>
        </div>);
    }
    return (
      <div className="completed_filled">
        {programs}
        <Button
          variant="primary"
          size="sm"
          onClick={this.handleProgramUpdate}
        >
          Update
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => this.setState({completed: [...completed, {name: "", type:""}]})}
        >
          Add Program
        </Button>
      </div>
    );
  }

  renderEmptySemesters() {
    return (
      <div className="semesters_empty">
        Semesters empty
      </div>
    );
  }

  bundleCourses(courseArray) {
    const courses = [];
    for (let j = 0; j < courseArray.length; j++) {
      courses.push(
        <div className="indiv_class">
          <div className="class_code">
            Code: {courseArray[j].code}
          </div>
          <div className="class_name">
            Name: {courseArray[j].name}
          </div>
          <div className="class_taken_for">
            Taken For: {courseArray[j].taken_for}
          </div>
        </div>
      )
    }
    return courses;
  }

  renderSemesters() {
    const { semesters } = this.state;
    const sems = [];
    for (let i = 0; i < semesters.length; i++) {
      sems.push(
        <div className="sem_semester">
          <div className="sem_number">
            Semester #: {semesters[i].sem_num}
          </div>
          <div className="sem_classes">
            {this.bundleCourses(semesters[i].courses)}
          </div>
        </div>);
    }
    return (
      <div className="semesters_filled">
        {sems}
      </div>
    );
  }

  render() {
    const { completed, semesters } = this.state;
    return (
      <div className="page_container">
        <div className="account_container">
          {this.renderAccountInfo()}
        </div>
        <div className="completed_container">
          {completed.length === 0
            ? this.renderEmptyCompleted()
            : this.renderCompleted()
          }
        </div>
        <div className="semester_container">
          {semesters.length === 0
            ? this.renderEmptySemesters()
            : this.renderSemesters()
          }
        </div>
      </div>
    );
  }
}

export default Account;
