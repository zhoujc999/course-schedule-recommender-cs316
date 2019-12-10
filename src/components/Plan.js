import './stylesheets/Plan.css';
import Semester from './Semester';
import React, { Component } from "react";

class Plan extends Component {
  /* Each Plan corresponding to the user's request
  made up of semesters and courses. Data received from
  databse (semester and course tables) and passed down
  to child components */

  renderPlanInfo(planInfo) {
    const programs = planInfo.programs.map(p => `${p.name} ${p.type}`).map(ps => (
      <span className="program">
        {ps}
      </span>
    ))
    return (
      <div className="plan_text">
        <div className="plan_programs">
          {programs}
        </div>
        <div className="plan_user">
          {`User: ${planInfo.user}`}
        </div>
        <div className="plan_user_descr">
          {`Description: ${planInfo.description}`}
        </div>
      </div>
    );
  }

  render() {
    const { input, ...other } = this.props;
    const semesterVals = [];
    for (var key of Object.keys(input.semesters)) {
      semesterVals.push(<Semester
          sem_data={input.semesters[key]}
          s_key={key}
          key={key}
          {...other}
        />);
    }
    return (
      <div className="plan_container">
        <div className="plan_info">
          {this.renderPlanInfo(input.planInfo)}
        </div>
        <div className="plan">
          {semesterVals}
        </div>
        <hr className="hrstyle_main" />
      </div>
    );
  }
}

export default Plan;
