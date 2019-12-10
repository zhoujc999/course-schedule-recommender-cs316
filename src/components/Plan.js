import './stylesheets/Plan.css';
import Semester from './Semester';
import React, { Component } from "react";

//Temporary semester and course data
//TODO get real semester and course data from database in home

class Plan extends Component {
  /* Each Plan corresponding to the user's request
  made up of semesters and courses. Data received from
  databse (semester and course tables) and passed down
  to child components*/
  //Plan creates multiple Semester components

  renderPlanInfo(planInfo) {
    const programs = planInfo.programs.map(p => `${p.name} ${p.type}`).map(ps => (
      <span className="program">
        {ps}
      </span>
    ))
    const name = 5
    return (
      <div className="plan_text">
        <div className="plan_programs">
          {programs}
        </div>
        <div className="plan_user">
          //{`User: ${planInfo.user}`}
            {`User: {name}`}
        </div>
        <div className="plan_user_descr">
          {`Description: ${planInfo.description}`}
        </div>
      </div>
    );
  }

  render() {
    //TODO update DUMMY_SEMESTER_DATA constant to be true data
    const { input, ...other } = this.props;
    const semesters = [];
    for (let i = 0; i < input.semesters.length; i++) {
      semesters.push(
        <Semester
          sem_data={input.semesters[i]}
          s_key={i}
          key={i}
          {...other}
        />);
    }
    return (
      <div>
        <div className="plan_info">
          {this.renderPlanInfo(input.planInfo)}
        </div>
        <div className="plan">
          {semesters}
        </div>
      </div>
    );
  }
}

export default Plan;
