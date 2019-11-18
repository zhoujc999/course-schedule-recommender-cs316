/*jshint esversion: 6 */
import React, { Component } from "react";
import './stylesheets/Account.css';

const DUMMY_ACCOUNT_INFO = ["joe24", "A pasta expert"];
const DUMMY_COMPLETED = [["Culinary Arts", "B.A."]];
const DUMMY_SEMESTERS = [
  {"1": [ {"ART101": ["Art101", "Culinary Arts B.A"]}, {"PASTA101": ["Cooking101", "Culinary Arts B.A"]}] },
  {"2": [ {"PASTA102": ["The Art of Spaghetti", "Culinary Arts B.A"]}] },
  {"3": [ {"PASTA201": ["Macaroni Art", "Culinary Arts B.A"]}] },
  {"4": [ {"PASTA305": ["Linguini Painting", "Culinary Arts B.A"]}, {"PASTA255": ["Tortellini Sculpting", "Culinary Arts B.A"]}] },
  {"5": [ {"PASTA420": ["Writing Orzo", "Culinary Arts B.A"]}, {"PASTA465": ["Photographing Capellini", "Culinary Arts B.A"]}] }
];

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: [], //User ID, email, bio -> Student DB
      completed: [], //Programs completed -> Completed + Program DB
      semesters: [], //Sems of classes completed -> Semester + Class DB
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    //Update information on page
    //Send to state and then send updated info to backend
  }

  componentDidMount() {
    //TODO: Get existing data from database, if exists
    console.log(this.state);
    this.setState({
      accountInfo: DUMMY_ACCOUNT_INFO,
      completed: DUMMY_COMPLETED,
      semesters: DUMMY_SEMESTERS
    });
  }

  renderEmptyAccountInfo() {
    console.log('hellooooo');
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
        <div className = "user">
          <div className="netid">
            Username: {accountInfo[0]}
          </div>
          <div className="email">
            Email: {accountInfo[0] + "@duke.edu"}
          </div>
        </div>
        <div className="bio">
          Bio: {accountInfo[1]}
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
        <div className="program">
          <div className="name">
            Program: {completed[i][0]}
          </div>
          <div className="type">
            Type: {completed[i][1]}
          </div>
        </div>);
    }
    return (
      <div className="completed_filled">
        {programs}
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

  scrapeClasses(classArray) {
    const classes = [];
    for (let j = 0; j < classArray.length; j++) {
      classes.push(
        <div className="class">
          <div className="code">
            Code: {Object.keys(classArray[j])[0]}
          </div>
          <div className="name">
            Name: {classArray[j][Object.keys(classArray[j])[0]][0]}
          </div>
          <div className="taken_for">
            Taken For: {classArray[j][Object.keys(classArray[j])[0]][1]}
          </div>
        </div>
      )
    }
    return classes;
  }

  renderSemesters() {
    const { semesters } = this.state;
    const sems = [];
    for (let i = 0; i < semesters.length; i++) {
      sems.push(
        <div className="semester">
          <div className="number">
            Semester #: {Object.keys(semesters[i])[0]}
          </div>
          <div className="classes">
            {this.scrapeClasses(semesters[i][Object.keys(semesters[i])[0]])}
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
    return (
      <div className="page_container">
        <div className="account_container">
          {accountInfo.length === 0
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
