import './stylesheets/Course.css';
import ReactTooltip from 'react-tooltip';
import React, { Component } from "react";

class Course extends Component {
  /* Each Course corresponding to the user's request
  in a given semester of a given plan. Data received from
  databse (semester and course tables) and passed down
  here. Later development can incorporate more meaning
  into Course (ex. review system) */
  //Course lowest level component

  render() {
    const {
      course_data,
      p_key, s_key, c_key
    } = this.props;
    return (
      <div className="course">
        <div
          className="course_code"
          data-tip data-for={`p${p_key}s${s_key}c${c_key}`}
        >
          {course_data.classid}
        </div>
        <ReactTooltip
          id={`p${p_key}s${s_key}c${c_key}`}
          place="right"
          type="light"
          effect="float"
        >
          {`Class Code: ${course_data.classid}`}
          <br/>
          {`Class Name: ${course_data.name}`}
          <br />
          {`Taken For: ${course_data.taken_program.name} ${course_data.taken_program.type}`}
        </ReactTooltip>
      </div>
    );
  }
}

export default Course;
