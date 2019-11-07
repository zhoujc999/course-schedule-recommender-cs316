import './stylesheets/Semester.css';
import Course from './Course';
import React, { Component } from "react";

class Semester extends Component {
  /* Semester components that make up individual plans
  and which are made up of a series of courses, all received
  from database (semester and course table) passed here */
  //Semester creates multiple Course components

  render() {
    const {course_data, semester_number} = this.props;
    const courses = [];
    for (let i = 0; i < course_data.length; i++) {
      courses.push(
        <Course
          data={course_data[i]}
          key={i}
        />);
    }
    return (
      <div>
        <div className="semester_text">
          {"Semester "+semester_number}
        </div>
        <div className="semester">
          {courses}
        </div>
      </div>
    );
  }
}

export default Semester;
