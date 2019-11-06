import React, { Component } from "react";
// import './stylesheets/Course.css';

class Course extends Component {

  render() {
    const {data} = this.props;
    return (
      <div>
        {data}
      </div>
    );
  }
}

export default Course;
