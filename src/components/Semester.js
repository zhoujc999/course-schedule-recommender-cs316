import './stylesheets/Semester.css';
import Course from './Course';
import React, { Component } from "react";

class Semester extends Component {
  /* Semester components that make up individual plans
  and which are made up of a series of courses, all received
  from database (semester and course table) passed here */
  //Semester creates multiple Course components

  render() {
    const {sem_data} = this.props;
    const courses = [];
    for (let i = 0; i < sem_data.courses.length; i++) {
      courses.push(
        <Course
          course_data={sem_data.courses[i]}
          key={i}
        />);
    }
    return (
      <div>
        <div className="semester_text">
          {"Semester "+sem_data.sem_num}
        </div>
        <div className="semester">
          {courses}
        </div>
      </div>
    );
  }
}

export default Semester;
