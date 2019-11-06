import React, { Component } from "react";
import Course from './Course';
// import './stylesheets/Semester.css';

class Semester extends Component {

  render() {
    const {course_data} = this.props;
    const courses = [];
    for (let i = 0; i < course_data.length; i++) {
      courses.push(<Course data={course_data[i]} key={i} />);
    }
    return (
      <div>
        {courses}
      </div>
    );
  }
}

export default Semester;
