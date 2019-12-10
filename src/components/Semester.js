import './stylesheets/Semester.css';
import Course from './Course';
import React, { Component } from "react";

class Semester extends Component {
  /* Semester components that make up individual plans
  and which are made up of a series of courses, all received
  from database (semester and course table) passed here */
  //Semester creates multiple Course components

  render() {
    const { sem_data, ...other } = this.props;
    const courses = [];
    for (let i = 0; i < sem_data.length; i++) {
      courses.push(
        <Course
          course_data={sem_data[i]}
          c_key={i}
          key={i}
          {...other}
        />);
    }
    return (
      <div className="sem_container">
        <div className="semester_text">
          {"Semester "+this.props.s_key}
        </div>
        <div className="semester_courses">
          {courses}
        </div>
      </div>
    );
  }
}

export default Semester;
