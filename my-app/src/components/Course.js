import React, { Component } from "react";
import './stylesheets/Course.css';

class Course extends Component {

  render() {
    const {data} = this.props;
    return (
      <div className="course">
        {data}
      </div>
    );
  }
}

export default Course;
