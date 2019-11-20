/*jshint esversion: 6 */
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
// import Select from 'react-select';
import Select from '@material-ui/core/Select';
import ReactTooltip from 'react-tooltip';
import Form from 'react-bootstrap/Form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import './stylesheets/Account.css';

const DUMMY_ACCOUNT_INFO = {netid: "joe24", bio: "A pasta expert"};
const DUMMY_COMPLETED = [{name: "Culinary Arts", type: "B.A."}, {name: "Astrophysics", type: "Ph.D."}];
const DUMMY_SEMESTERS = [
  { sem_num: "1", courses: [ {code: "ART101", name: "Art101", taken_for: "Culinary Arts B.A"}, {code: "PASTA101", name: "Cooking101", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "2", courses: [ {code: "PASTA102", name: "The Art of Spaghetti", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "3", courses: [ {code: "PASTA201", name: "Macaroni Art", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "4", courses: [ {code: "PASTA305", name: "Linguini Painting", taken_for: "Culinary Arts B.A"}, {code: "PASTA255", name: "Tortellini Sculpting", taken_for: "Culinary Arts B.A"} ] },
  { sem_num: "5", courses: [ {code: "PASTA420", name: "Writing Orzo", taken_for: "Culinary Arts B.A"}, {code: "PASTA465", name: "Phtographing Capellini", taken_for: "Culinary Arts B.A"} ] },
];
// const DUMMY_TYPES = [{value: "B.A.", label: "B.A."}, {value: "B.S.", label: "B.S."}, {value: "Concentration", label: "Concentration"}, {value: "Ph.D.", label: "Ph.D."}, {value: "Minor", label: "Minor"}];
const DUMMY_PROGRAMS = [{value: "Computer Science", label: "Computer Science"}, {value: "Psychology", label: "Psychology"}, {value: "Astrophysics", label: "Astrophysics"}, {value: "Culinary Arts", label: "Culinary Arts"}];
const DUMMY_OPTIONS = DUMMY_PROGRAMS.map(val => (<MenuItem value={val.value}>{val.label}</MenuItem>));

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: {netid: "", bio: ""}, //User ID, email, bio -> Student DB
      completed: [], //Programs completed -> Completed + Program DB
      semesters: [], //Sems of classes completed -> Semester + Class DB
      bioUpdated: false,
      newCompleted: [],
      newSemesters: [],
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleBioSubmit = this.handleBioSubmit.bind(this);
    this.removeProgram = this.removeProgram.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
  }

  handleUpdate() {
    //TODO: Send updated info to backend
    console.log('updating backend');
    console.log(this.state);
    this.setState({ bioUpdated: true });
  }

  handleBioSubmit(e) {
    //Send to state and then TODO: send updated info to backend
    e.preventDefault();
    if (
      e.target[0].value.length > 0 &&
      e.target[0].value !== this.state.accountInfo.bio
    ) {
      this.setState({ accountInfo:
        { netid: this.state.accountInfo.netid, bio: e.target[0].value }
      }, () => {
        this.handleUpdate(); //TODO: CHANGE TO DO UPDATING HERE
      });
    }
  }

  handleProgramUpdate(event) {
    //Update information on page
    //Send to state and then send updated info to backend
    event.preventDefault();
    console.log(this.state);
  }

  handleProgNameChange(event) {
    console.log(event);
  }

  handleProgTypeChange(event) {
    console.log(event);
  }

  componentDidMount() {
    //TODO: Get existing data from database, if exists and put into state
    this.setState({
      accountInfo: DUMMY_ACCOUNT_INFO,
      completed: DUMMY_COMPLETED,
      semesters: DUMMY_SEMESTERS,
    });
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
              <Form.Label className="bio_form_label">
                Description
              </Form.Label>
              <div className="fas fa-question-circle" data-tip data-for="acc_bio" />
              <ReactTooltip id="acc_bio" place="right" type="info" effect="float">
                {"A brief bio or description about you and your plans."}
                <br/>
                {'Ex. "Interested in data science/Norse literature/public policy/etc."'}
              </ReactTooltip>
              <Form.Control
                as="textarea"
                defaultValue={ accountInfo.bio }
                placeholder={ bioPlaceholder }
                onChange={ () => this.setState({ bioUpdated: false }) }
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={ bioUpdated }
            >
              Update Description
            </Button>
            {bioUpdated === true && (
              <span className="success_text">Successfully Updated!</span>
            )}
          </Form>
        </div>
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  renderEmptyCompleted() {
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
              onClick={() => this.setState({completed: [...completed, {name: "", type:""}]})}
            >
              Add Program
            </Button>
          </div>
        </div>
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  removeProgram(i) {
    // const completed = this.state.completed;
    // completed.splice(i, 1);
    // this.setState({ completed });

    this.setState((prevState) => ({
      completed: [...prevState.completed.slice(0,i), ...prevState.completed.slice(i+1)]
    }))
  }

  handleProgramChange = i => event => {
    let completed = [...this.state.completed];
    completed[i].name = event.target.value;
    this.setState({ completed });
  }

  renderCompleted() {
    const { completed } = this.state;
    console.log('HERE');
    console.log(DUMMY_OPTIONS)
    console.log(completed)
    const programs = this.state.completed.map((prog, i) => (
        <div key={i}>
          <div className="label">Program</div>
            <FormControl>
            <Select
              autowidth
              value={prog.name}
              onChange={this.handleProgramChange(i)}
            >
              <MenuItem value="" disabled>
                {"ex. Psychology/Statistics/etc."}
              </MenuItem>
              {DUMMY_OPTIONS}
            </Select>
            </FormControl>
        </div>
      )
    );



    // <Select
    //   isClearable
    //   value={{value: prog.name, label: prog.name}}
    //   onChange={ this.handleProgramChange(i) }
    //   onCreateNew={ this.handleProgramChange(i) }
    //   placeholder={ "ex. Psychology/Statistics/etc." }
    //   options={ DUMMY_PROGRAMS }
    // />
        // <div>
        //   <Form>
        //     <Form.Group controlId="formProg" role="form">
        //       <Form.Label className="program_label">Program</Form.Label>
        //       <Form.Control
        //         as="input"
        //         value={ completed[i].name }
        //         placeholder={ "ex. Psychology/Statistics/etc." }
        //         onChange={e => this.handleProgramChange(i, e)}
        //       />
        //     </Form.Group>
        //     <Button
        //       variant="secondary"
        //       size="sm"
        //       onClick={() => this.removeProgram(i)}
        //     >
        //       Remove
        //     </Button>
        //   </Form>
        // </div>
      // )
    // }
    // for (let i = 0; i < completed.length; i++) {
    //   programs.push(
    //     <div>
    //       <form>
    //         <label>
    //           Program:
    //           <input
    //             type="text"
    //             placeholder={completed[i].name}
    //             onChange={this.handleProgNameChange}
    //           />
    //         </label>
    //         <label>
    //           Type:
    //           <Select
    //             clearable
    //             create
    //             options={DUMMY_TYPES}
    //             value={completed[i].type}
    //             placeholder={completed[i].type}
    //             onChange={(value) => this.state.completed[i].type = value}
    //             onCreateNew={(value) => this.state.completed[i].type = value}
    //           />
    //         </label>
            // <Button
            //   variant="secondary"
            //   size="sm"
            //   onClick={() =>
            //     this.setState({completed: this.state.completed.filter((v, ind) => ind !== i)})
            //   }
            // >
    //           Remove
    //         </Button>
    //       </form>
    //     </div>);
    // }
    return (
      <div className="completed_filled">
        <span className="completed_header">Plan Info</span>
        <hr className="hrstyle_main" />
        {programs}
        <div className="completed_add_button">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => this.setState({completed: [...completed, {name: "", type:""}]})}
          >
            Add Program
          </Button>
        </div>
        <div className="completed_remove_button">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => this.setState({completed: [...completed.slice(0,-1)]})}
          >
            Remove
          </Button>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={this.handleProgramUpdate}
        >
          Update
        </Button>
        <hr className="hrstyle_separator" />
      </div>
    );
  }

  renderEmptySemesters() {
    return (
      <div className="semesters_empty">
        Semesters empty
      </div>
    );
  }

  bundleCourses(courseArray) {
    const courses = [];
    for (let j = 0; j < courseArray.length; j++) {
      courses.push(
        <div className="indiv_class" key={j}>
          <div className="class_code">
            Code: {courseArray[j].code}
          </div>
          <div className="class_name">
            Name: {courseArray[j].name}
          </div>
          <div className="class_taken_for">
            Taken For: {courseArray[j].taken_for}
          </div>
        </div>
      )
    }
    return courses;
  }

  renderSemesters() {
    const { semesters } = this.state;
    const sems = [];
    for (let i = 0; i < semesters.length; i++) {
      sems.push(
        <div className="sem_semester" key={i}>
          <div className="sem_number">
            Semester #: {semesters[i].sem_num}
          </div>
          <div className="sem_classes">
            {this.bundleCourses(semesters[i].courses)}
          </div>
        </div>);
    }
    return (
      <div className="semesters_filled">
        {sems}
      </div>
    );
  }

  render() {
    const { completed, semesters } = this.state;
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
