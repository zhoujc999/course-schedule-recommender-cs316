import './stylesheets/Plan.css';
import Semester from './Semester';
import React, { Component } from "react";

//Temporary semester and course data
//TODO get real semester and course data from database in home
const SEMESTER_DATA = [
  ["Art101", "Cooking101"],
  ["The Art of Spaghetti"],
  ["Macaroni Art"],
  ["Linguini Painting", "Tortellini Sculpting"],
  ["Writing Orzo", "Photographing Capellini"]
];

class Plan extends Component {
  /* Each Plan corresponding to the user's request
  made up of semesters and courses. Data received from
  databse (semester and course tables) and passed down
  to child components*/
  //Plan creates multiple Semester components

  render() {
    //TODO update SEMESTER_DATA constant to be true data
    const { input } = this.props;
    const semesters = [];
    for (let i = 0; i < SEMESTER_DATA.length; i++) {
      semesters.push(
        <Semester
          course_data={SEMESTER_DATA[i]}
          semester_number={i+1}
          key={i}
        />);
    }
    return (
      <div>
        <div className="plan_text">
          {input.label}
          </div>
          <div className="plan">
          {semesters}
        </div>
      </div>
    );
  }
}

export default Plan;
