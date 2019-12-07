import './stylesheets/Course.css';
import React, { Component } from "react";

class Course extends Component {
  /* Each Course corresponding to the user's request
  in a given semester of a given plan. Data received from
  databse (semester and course tables) and passed down
  here. Later development can incorporate more meaning
  into Course (ex. review system) */
  //Course lowest level component

  render() {
    const {course_data} = this.props;
    return (
      <div className="course">
        {course_data.name}
      </div>
    );
  }
}

export default Course;
