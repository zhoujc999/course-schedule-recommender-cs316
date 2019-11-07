import React, { Component } from "react";
import Semester from './Semester';
import './stylesheets/Plan.css';

//DUMMY DATA
const SEMESTER_DATA = [["Course 1", "Course 2"], ["Course 1"], ["Course 1"], ["Course 1"]];

class Plan extends Component {

  render() {
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
