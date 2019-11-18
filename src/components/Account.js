/*jshint esversion: 6 */
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
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
    this.handleBioUpdate = this.handleBioUpdate.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
  }

  handleUpdate() {
    //TODO: Send updated info to backend
    console.log('updating backend');
    console.log(this.state);
  }

  handleBioUpdate(event) {
    //Update information on page
    //Send to state and then send updated info to backend
    event.preventDefault();
    if (
      this.state.newAccountInfo.bio.length > 0 &&
      this.state.newAccountInfo.bio !== this.state.accountInfo.bio
    ) {
        this.setState({accountInfo: this.state.newAccountInfo}, () => {
          this.handleUpdate();
        });
    }
  }

  handleBioChange(event) {
    this.setState({newAccountInfo: {netid: this.state.accountInfo.netid, bio: event.target.value}});
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

  renderEmptyAccountInfo() {
    return (
      <div className="account_empty">
        account empty
      </div>
    );
  }

  renderAccountInfo() {
    const { accountInfo } = this.state;
    return (
      <div className="account_filled">
        <div className = "account_user">
          <div className="account_netid">
            Username: {accountInfo.netid}
          </div>
          <div className="account_email">
            Email: {accountInfo.netid + "@duke.edu"}
          </div>
        </div>
        <div className="account_bio">
          <form onSubmit={this.handleBioUpdate}>
            <label>
              Bio:
              <input
                type="text"
                placeholder={accountInfo.bio}
                onChange={this.handleBioChange}
              />
            </label>
            <input type="submit" value="Update" />
          </form>
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
              <input
                type="text"
                placeholder={completed[i].type}
                onChange={this.handleProgTypeChange}
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

  // renderCompleted() {
  //   const { completed } = this.state;
  //   const programs = [];
  //   for (let i = 0; i < completed.length; i++) {
  //     programs.push(
  //       <div className="completed_program">
  //         <div className="completed_name">
  //
  //
  //
  //
  //           Program: {completed[i].name}
  //         </div>
  //         <div className="completed_type">
  //           Type: {completed[i].type}
  //         </div>
  //       </div>);
  //   }
  //   return (
  //     <div className="completed_filled">
  //       {programs}
  //     </div>
  //   );
  // }

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
    const { completed, semesters, accountInfo } = this.state;
    console.log(this.state);
    return (
      <div className="page_container">
        <div className="account_container">
          {accountInfo.bio.length === 0
            ? this.renderEmptyAccountInfo()
            : this.renderAccountInfo()
          }
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
