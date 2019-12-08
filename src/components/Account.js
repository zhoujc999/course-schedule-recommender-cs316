/*jshint esversion: 6 */
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Select from 'react-dropdown-select';
import ReactTooltip from 'react-tooltip';
import Form from 'react-bootstrap/Form';
import './stylesheets/Account.css';
import axios from 'axios';

const DUMMY_ACCOUNT_INFO = {netid: "joe24", bio: "A pasta expert"};
const DUMMY_COMPLETED = [{name: "Culinary Arts", type: "B.A."}, {name: "Astrophysics", type: "Ph.D."}];
// const DUMMY_SEMESTERS = [];
const DUMMY_SEMESTERS = [
  { sem_num: 1, courses: [ {code: "ART101", name: "Art101", taken_for: "Culinary Arts B.A."}, {code: "PASTA101", name: "Cooking101", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 2, courses: [ {code: "PASTA102", name: "The Art of Spaghetti", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 3, courses: [ {code: "PASTA201", name: "Macaroni Art", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 4, courses: [ {code: "PASTA305", name: "Linguini Painting", taken_for: "Culinary Arts B.A."}, {code: "PASTA255", name: "Tortellini Sculpting", taken_for: "Culinary Arts B.A."} ] },
  { sem_num: 5, courses: [ {code: "PASTA420", name: "Writing Orzo", taken_for: "Culinary Arts B.A."}, {code: "PASTA465", name: "Photographing Capellini", taken_for: "Culinary Arts B.A."} ] },
];
const DUMMY_TYPES = [{value: "B.A.", label: "B.A."}, {value: "B.S.", label: "B.S."}, {value: "Concentration", label: "Concentration"}, {value: "Ph.D.", label: "Ph.D."}, {value: "Minor", label: "Minor"}];
const DUMMY_PROGRAMS = [{value: "Computer Science", label: "Computer Science"}, {value: "Psychology", label: "Psychology"}, {value: "Astrophysics", label: "Astrophysics"}, {value: "Culinary Arts", label: "Culinary Arts"}];
const DUMMY_COURSES = [{code: "ART101", name: "Art101"}, {code: "PASTA102", name: "Cooking101"}, {code: "PASTA201", name: "The Art of Spaghetti"}, {code: "PASTA101", name: "Macaroni Art"}, {code: "PASTA305", name: "Linguini Painting"}, {code: "PASTA255", name: "Tortellini Sculpting"}, {code: "PASTA420", name: "Writing Orzo"}, {code: "PASTA465", name: "Photographing Capellini"}, {code: "MATH212", name: "Multivariable Calculus"}, {code: "CHEM101", name: "Intro to Chemistry"}];

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: {netid: "", bio: ""}, //User ID, email, bio -> Student DB
      completed: [], //Programs completed -> Completed + Program DB
      semesters: [], //Sems of classes completed -> Semester + Class DB
      bioUpdated: "INITIAL",
      progUpdated: "INITIAL",
      semsUpdated: "INITIAL",
      programOptions: DUMMY_PROGRAMS,
      typeOptions: DUMMY_TYPES,
      error: false
    };
    this.handleBioUpdate = this.handleBioUpdate.bind(this);
    this.handleBioSubmit = this.handleBioSubmit.bind(this);
    this.handleProgramUpdate = this.handleProgramUpdate.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSemesterUpdate = this.handleSemesterUpdate.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleAddCourse = this.handleAddCourse.bind(this);
    this.handleRemoveCourse = this.handleRemoveCourse.bind(this);
  }

  handleBioSubmit(e) {
    //Send to state and then TODO: send updated info to backend
    e.preventDefault();
    if (e.target[0].value.length === 0) {
      //blank
      this.setState({ bioUpdated: "FAILED" });
    } else if (e.target[0].value === this.state.accountInfo.bio) {
      //no change
      this.setState({ bioUpdated: "INITIAL" });
    } else {
      //good change
      this.setState({ accountInfo:
        { netid: this.state.accountInfo.netid, bio: e.target[0].value }
      }, () => {
        this.handleBioUpdate(); //TODO: CHANGE TO DO UPDATING HERE
      });
    }
  }

  handleBioUpdate() {
    //This function should be "final" confirmation of bio change
    //TODO: Send updated info to backend
    //TODO: Get rid of console logs
    console.log('updating backend');
    console.log(this.state);
    this.setState({ bioUpdated: "SUCCESS" });
  }

  handleProgramChange = i => selectedValue => {
    //Handles change in program name selection at index i
    let completed = [...this.state.completed];
    completed[i].name = selectedValue[0].name;
    this.setState({ completed, progUpdated: "PENDING" });
  }

  handleTypeChange = i => selectedValue => {
    //Handles change in program type selection at index i
    let completed = [...this.state.completed];
    completed[i].type = selectedValue[0].type;
    this.setState({ completed, progUpdated: "PENDING" });
  }

  handleProgramUpdate() {
    //This function should be "final" confirmation of program change
    //TODO: Send updated info to backend
    //Check to make sure nothing is empty
    //TODO: Get rid of console logs
    console.log('updating backend');
    console.log(this.state);

    const { completed } = this.state;
    let canUpdate = true;
    for (let i = 0; i < completed.length; i++) {
      if (completed[i].name === "" || completed[i].type === "") {
        canUpdate = false;
      }
    }
    if (canUpdate === true) {
      this.setState({ progUpdated: "SUCCESS" }); //TODO: UPDATE BACKEND/DB
    } else {
      this.setState({ progUpdated: "FAILED" });
    }
  }

  handleCourseChange = (i, s_i, field) => selectedValue => {
    //Handles change in semester s_i course selection at index i
    let semesters = [...this.state.semesters];
    semesters.find(val => val.sem_num === s_i)
      .courses[i][field] = selectedValue[0][field];
    this.setState({ semesters, semsUpdated: "PENDING" });
  }

  handleAddCourse = s_i => {
    //Handles adding a course to semester s_i
    let semesters = [...this.state.semesters];
    semesters.find(val => val.sem_num === s_i)
      .courses.push({ code: "", name: "", taken_for: "" });
    this.setState({ semesters, semsUpdated: "PENDING" });
  }

  handleRemoveCourse = s_i => {
    //Handles removing a course to semester s_i
    let semesters = [...this.state.semesters];
    semesters.find(val => val.sem_num === s_i).courses =
      semesters.find(val => val.sem_num === s_i).courses.slice(0, -1);
    this.setState({ semesters, semsUpdated: "PENDING" });
  }

  handleSemesterUpdate() {
    //This function should be "final" confirmation of semester change
    //TODO: Send updated info to backend
    //TODO: Get rid of console logs
    console.log('updating backend');
    console.log(this.state);
    const { semesters } = this.state;
    let canUpdate = true;
    for (let i = 0; i < semesters.length; i++) {
      if (semesters[i].courses.length === 0) {
        canUpdate = false;
        break;
      } else {
        for (let j = 0; j < semesters[i].courses.length; j++) {
          let course = semesters[i].courses[j];
          if (course.code === "" || course.name === "" || course.taken_for === "") {
            canUpdate = false;
            break;
          }
        }
      }
    }
    if (canUpdate === true) {
      this.setState({ semsUpdated: "SUCCESS" }); //TODO: UPDATE BACKEND/DB
    } else {
      this.setState({ semsUpdated: "FAILED" });
    }
  }

  renderAccountInfo() {
    const { accountInfo, bioUpdated } = this.state;
    const bioPlaceholder = 'Enter a brief bio or description about you and ' +
      'your plans.\nEx. "Interested in data science/Norse literature/public ' +
      'policy/etc."';
    return (
      <div>
        <span className="account_header">Account Info</span>
        <hr className="hrstyle_main" />
        <div className="account_user">
          <div className="account_netid">
            Username: { accountInfo.netid }
          </div>
          <div className="account_email">
            Email: { accountInfo.netid + "@duke.edu" }
          </div>
        </div>
        <div className="account_bio">
          <Form onSubmit={ this.handleBioSubmit }>
            <Form.Group controlId="formBio" role="form">
              <div className="bio_top">
                <Form.Label className="bio_form_label">
                  Description:
                </Form.Label>
                <i
                  className="fas fa-question-circle"
                  data-tip data-for="acc_bio"
                  style={{color: "#17a2b8", padding: "8px 4px 0px 0px"}}
                />
                <ReactTooltip
                  id="acc_bio"
                  place="right"
                  type="info"
                  effect="float"
                >
                  {"A brief bio or description about you and your plans."}
                  <br/>
                  {'Ex. "Interested in data science/literature/public ' +
                    'policy/etc."'
                  }
                </ReactTooltip>
                {
                  bioUpdated === "FAILED" &&
                  this.renderWarningIcon("Don't leave your bio blank!")
                }
              </div>
              <Form.Control
                as="textarea"
                defaultValue={ accountInfo.bio }
                placeholder={ bioPlaceholder }
                onChange={ () => this.setState({ bioUpdated: "PENDING" }) }
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={ bioUpdated === "SUCCESS" || bioUpdated === "INITIAL" }
            >
              Update Description
            </Button>
            {bioUpdated === "SUCCESS" && (
              <span className="success_text">Successfully Updated!</span>
            )}
            {bioUpdated === "FAILED" && (
              <span className="failed_text">
                Something went wrong... Please check error icons and try again
              </span>
            )}
          </Form>
        </div>
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  renderEmptyCompleted() {
    //Render Plan Info when completed plans is empty
    const { completed } = this.state;
    return (
      <div>
        <span className="completed_header">Plan Info</span>
        <hr className="hrstyle_main" />
        <div className="completed_empty_main">
          <span className="no_plan_text">
            You have no plan! Please add your academic program(s) below
          </span>
          <div className="completed_add_button">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                this.setState({
                  completed: [...completed, {name: "", type:""}],
                  progUpdated: "PENDING"
                })
              }
            >
              Add Program
            </Button>
          </div>
        </div>
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  renderCompleted() {
    //Render Plan Info with at least one program
    //TODO: replace DUMMY_PROGRAMS and DUMMY_TYPES with real data
    const { completed, progUpdated } = this.state;
    const programPlaceholder = "ex. Psychology/Statistics/etc.";
    const typePlaceholder = "ex. B.S./Minor/etc.";
    const programs = this.state.completed.map((prog, i) => (
        <div className="program" key={i}>
          <div className="program_label">Program:</div>
          <i
            className="fas fa-question-circle"
            data-tip data-for="prog_name"
            style={{color: "#17a2b8", padding: "8px 4px 0px 0px"}}
          />
          <ReactTooltip
            id="prog_name"
            place="right"
            type="info"
            effect="float"
          >
            {"The name of your academic program/path/area of study."}
            <br/>
            {'If you do not see your program listed, type it in and add it'}
          </ReactTooltip>
          {
            prog.name === "" &&
            this.renderWarningIcon("Please complete this field")
          }
          <div className="program_select">
            <Select
              searchable
              create
              labelField={"name"} //field of object
              valueField={"name"} //change field to key in real data
              searchBy={"name"}
              placeholder={ programPlaceholder }
              addPlaceholder={ prog.name === "" && programPlaceholder }
              onChange={ this.handleProgramChange(i) }
              values={
                [prog.name !== "" &&
                this.state.programOptions.find(val => val.value === prog.name)]
              }
              options={ this.state.programOptions }
            />
          </div>
          <div className="type_label">Type:</div>
          <i
            className="fas fa-question-circle"
            data-tip data-for="prog_type"
            style={{color: "#17a2b8", padding: "8px 4px 0px 0px"}}
          />
          <ReactTooltip
            id="prog_type"
            place="right"
            type="info"
            effect="float"
          >
            {"The type of program you are in (B.S./Minor/Concentration/etc.)."}
            <br/>
            {'If you do not see your program type listed, type it in and add it'}
          </ReactTooltip>
          {
            prog.type === "" &&
            this.renderWarningIcon("Please complete this field")
          }
          <div className="type_select">
            <Select
              searchable
              create
              labelField={"type"} //field of object
              valueField={"type"} //change field to key in real data
              searchBy={"type"}
              placeholder={ typePlaceholder }
              addPlaceholder={ prog.type === "" && typePlaceholder }
              onChange={ this.handleTypeChange(i) }
              values={
                [prog.type !== "" &&
                this.state.typeOptions.find(val => val.value === prog.type)]
              }
              options={ this.state.typeOptions }
            />
          </div>
        </div>
      )
    );
    return (
      <div>
        <span className="completed_header">Plan Info</span>
        <hr className="hrstyle_main" />
        {programs}
        <div className="completed_buttons">
          <div className="completed_add_button">
            <Button
              variant="secondary"
              size="sm"
              disabled={this.state.completed.length >= 5}
              onClick={() =>
                this.setState({
                  completed: [...completed, {name: "", type:""}],
                  progUpdated: "PENDING"
                })
              }
            >
              Add Program
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                this.setState({
                  completed: [...completed.slice(0,-1)],
                  progUpdated: "PENDING"
                })
              }
            >
              Remove Program
            </Button>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={this.handleProgramUpdate}
          disabled={ progUpdated === "SUCCESS" || progUpdated === "INITIAL" }
        >
          Update
        </Button>
        {progUpdated === "SUCCESS" && (
          <span className="success_text">Successfully Updated!</span>
        )}
        {progUpdated === "FAILED" && (
          <span className="failed_text">
            Something went wrong... Please check error icons and try again
          </span>
        )}
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  renderEmptySemesters() {
    //Rendered when no semester info found
    const { semesters } = this.state;
    return (
      <div className="semesters_empty">
        <span className="semester_header">Course Schedule</span>
        <hr className="hrstyle_main" />
        <div className="sems_empty_main">
          <span className="no_sem_text">
            You have no course schedule! Please add your courses and semesters below
          </span>
          <div className="sems_add_button">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                this.setState({
                  semesters: [...semesters, {sem_num: 1, courses: []}],
                  semsUpdated: "PENDING"
                })
              }
            >
              Add Semester
            </Button>
          </div>
        </div>
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  emptyCourses(semester) {
    //Rendered when courses are empty for this semester
    return (
      <div className="empty_course">
        <div className="empty_course_top">
          <span className="no_course_text">
            No courses listed for this semester! Please add your courses below
          </span>
          {this.renderWarningIcon("Please add courses before submitting", "6px")}
        </div>
        <div className="course_add_button">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => this.handleAddCourse(semester.sem_num)}
          >
            Add Course
          </Button>
        </div>
      </div>
    );
  }

  makeCourses(semester) {
    //Creates Course Forms for each semester
    const courseCodePlaceholder = "ex. AMI215/MATH212/etc.";
    const coursePurposePlaceholder = "ex. Program/T-Req/Fun/etc.";
    const taken_options = [
      ...new Set(this.state.completed.map(prog => prog.name + " " + prog.type))
      .add('T-Reqs').add('Fun').add('Other')
    ].map(val => {return {taken_for: val}});
    const courses = semester.courses.map((course, i) => (
      <div className="indiv_course" key={i}>
        <div className="course_label">Course {i+1}</div>
        <div className="course_forms">
          <span className="course_form_label">Code: </span>
          <i
            className="fas fa-question-circle"
            data-tip data-for="course_code_tooltip"
            style={{color: "#17a2b8", padding: "12px 4px 0px 0px"}}
          />
          <ReactTooltip
            id="course_code_tooltip"
            place="right"
            type="info"
            effect="float"
          >
            {"The code associated with your course (ex. AMI215)"}
            <br/>
            {'If you do not see your course code listed, type it in and add it'}
          </ReactTooltip>
          {
            course.code === "" &&
            this.renderWarningIcon("Please complete this field", "12px")
          }
          <div className="course_form">
            <Select
              searchable
              labelField={"code"} //field of object
              valueField={"code"} //change field to key in real data
              searchBy={"code"}
              placeholder={ courseCodePlaceholder }
              addPlaceholder={ course.code === "" && courseCodePlaceholder }
              onChange={ this.handleCourseChange(i, semester.sem_num, "code") }
              values={
                [course.code !== "" &&
                DUMMY_COURSES.find(val => val.code === course.code)]
              }
              options={ DUMMY_COURSES }
            />
          </div>
          <span className="vl" />
          <span className="course_form_label">Name: </span>
          <div className="course_form_name">
            {DUMMY_COURSES.find(val => val.code === course.code) !== undefined
              ? DUMMY_COURSES.find(val => val.code === course.code).name
              : ""
            }
          </div>
          <span className="vl" />
          <span className="course_form_label">Taken For: </span>
          <i
            className="fas fa-question-circle"
            data-tip data-for="course_purpose_tooltip"
            style={{color: "#17a2b8", padding: "12px 4px 0px 0px"}}
          />
          <ReactTooltip
            id="course_purpose_tooltip"
            place="right"
            type="info"
            effect="float"
          >
            {"Why you took this course/for what requirement"}
          </ReactTooltip>
          {
            course.taken_for === "" &&
            this.renderWarningIcon("Please complete this field", "12px")
          }
          <div className="course_form">
            <Select
              searchable
              labelField={"taken_for"} //field of object
              valueField={"taken_for"} //change field to key in real data
              searchBy={"taken_for"}
              placeholder={ coursePurposePlaceholder }
              addPlaceholder={ course.taken_for === "" && coursePurposePlaceholder }
              onChange={ this.handleCourseChange(i, semester.sem_num, "taken_for") }
              values={
                [course.taken_for !== "" &&
                taken_options.find(val =>
                  val.taken_for === course.taken_for
                ) !== undefined ? taken_options.find(val => val.taken_for === course.taken_for)
                : {taken_for: ''}
                ]
              }
              options={ taken_options.filter(val => val !== '' & val !== ' ') }
            />
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        {courses}
        <div className="course_buttons">
          <div className="course_add_button">
            <Button
              disabled={courses.length >= 8}
              variant="secondary"
              size="sm"
              onClick={() => this.handleAddCourse(semester.sem_num)}
            >
              Add Course
            </Button>
          </div>
          <div className="course_remove_button">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => this.handleRemoveCourse(semester.sem_num)}
            >
              Remove Course
            </Button>
          </div>
        </div>
      </div>
    )
  }

  renderSemesters() {
    //Render schedule with at least one semester
    //TODO: replace DUMMY_SEMESTERS with real data
    const { semesters, semsUpdated } = this.state;
    console.log('RENDERING SEMESTERs')
    console.log(semesters)
    const sems = this.state.semesters.map((sem, i) => (
        <div className="indiv_semester" key={i}>
          <div className="semester_label">Semester {sem.sem_num}</div>
          <div className="courses">
            {sem.courses.length > 0
              ? this.makeCourses(sem)
              : this.emptyCourses(sem)
            }
          </div>
          <hr className="hrstyle_semester" />
        </div>
      )
    );
    return (
      <div>
        <span className="semester_header">Course Schedule</span>
        <hr className="hrstyle_main" />
        {sems}
        <div className="semester_buttons">
          <div className="sems_add_button">
            <Button
              variant="secondary"
              size="sm"
              disabled={this.state.semesters.length >= 10}
              onClick={() =>
                this.setState({
                  semesters: [...semesters, {sem_num: this.state.semesters.length + 1, courses: []}],
                  semsUpdated: "PENDING"
                })
              }
            >
              Add Semester
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                this.setState({
                  semesters: [...semesters.slice(0,-1)],
                  semsUpdated: "PENDING"
                })
              }
            >
              Remove Semester
            </Button>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={this.handleSemesterUpdate}
          disabled={ semsUpdated === "SUCCESS" || semsUpdated === "INITIAL" }
        >
          Update
        </Button>
        {semsUpdated === "SUCCESS" && (
          <span className="success_text">Successfully Updated!</span>
        )}
        {semsUpdated === "FAILED" && (
          <span className="failed_text">
            Something went wrong... Please check error icons and try again
          </span>
        )}
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  renderWarningIcon(message, paddingTop="8px") {
    //Render warning icon with tooltip containing message passed in to it
    return (
      <div>
        <i
          className="fas fa-exclamation-circle"
          style={{color: "#dc3545b8", paddingTop: `${paddingTop}`}}
          data-tip data-for="warning_icon"
        />
        <ReactTooltip
          id="warning_icon"
          place="right"
          type="error"
          effect="float"
        >
          {message}
        </ReactTooltip>
      </div>
    );
  }

  // componentDidUpdate() {
  // For Debugging state changes
  //   console.log('component update')
  //   console.log(this.state)
  // }

  componentDidMount() {
    //TODO: Get existing data from database, if exists and put into state
    console.log(this.props)
    this.getAccountInfo().then(accountRes => {
      this.getProgramInfo().then(progRes => {
        console.log(accountRes);
        console.log(progRes);
        this.setState({
          accountInfo: {netid: accountRes.data.netid, bio: accountRes.data.description},
          completed: DUMMY_COMPLETED,
          semesters: DUMMY_SEMESTERS
        })
      })
    });
  }

  getAccountInfo() {
    const studentURL = "https://course-schedule-recommender.herokuapp.com/api/students/";
    return axios.get(`${studentURL}${this.props.netid}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      this.setState({error: err});
    });
  }

  getProgramInfo() {
    const programUrl = "https://course-schedule-recommender.herokuapp.com/api/programs/";
    return axios.get(programUrl)
    .then(res => {
      const programs = [...new Set(res.data.map(val => val.name))];
      const types = [...new Set(res.data.map(val => val.type))];
      programs.sort();
      types.sort();
      const pMap = programs.map(p => ({value: p, label: p}));
      const tMap = types.map(t => ({value: t, label: t}));
      return {programs: pMap, types: tMap};
    })
    .catch(err => {
      this.setState({error: err});
    });
  }

  render() {
    const { completed, semesters } = this.state;
    console.log(this.state)
    return (
      <div className="page_container">
        <div className="account_container">
          {this.renderAccountInfo()}
        </div>
        <div className="completed_container">
          {completed.length === 0
            ? this.renderEmptyCompleted()
            : this.renderCompleted()
          }
        </div>
        <div className="semester_container">
          {semesters.length === 0
            ? this.renderEmptySemesters()
            : this.renderSemesters()
          }
        </div>
      </div>
    );
  }
}

export default Account;
