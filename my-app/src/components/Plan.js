import React, { Component } from "react";
import Semester from './Semester';
// import './stylesheets/Plan.css';

//DUMMY DATA
const SEMESTER_DATA = [["Course 1", "Course 2"], ["Course 1"], ["Course 1"], ["Course 1"]];

class Plan extends Component {

  render() {
    const {input} = this.props;
    const semesters = [];
    console.log(input);
    for (let i = 0; i < SEMESTER_DATA.length; i++) {
      semesters.push(<Semester course_data={SEMESTER_DATA[i]} key={i} />);
    }
    return (
      <div>
        {semesters}
      </div>
    );
  }
}

export default Plan;
