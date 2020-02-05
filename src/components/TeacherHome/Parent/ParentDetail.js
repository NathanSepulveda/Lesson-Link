import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Card } from "reactstrap";
import StudentAndParentManager from "../../../modules/StudentAndParentManager";
import PaymentsDisplay from "../../payments/PaymentDisplay";

const cardContent = {
  padding: "10px 10px 0 10px"
};

class ParentDetail extends Component {
  state = {
    parent: {},
    teacher: {},
    name: ""
  };

  componentDidMount() {
    let newState = {};
    let parentId = sessionStorage.getItem("parentId");
    StudentAndParentManager.getOneParent(parentId)
      .then(parent => {
        newState.parent = parent;
      })
      .then(() => StudentAndParentManager.getTeacher(newState.parent.teacherId))
      .then(teacher => {
        newState.teacher = teacher;
      })
      .then(() => this.setState(newState))
      .then(() => {
        newState.name = this.state.parent.name.split(" ")[0];
        this.setState(newState);
      });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;

    this.setState(stateToChange);

    console.log(this.state);
  };
  render() {
    let parentId = sessionStorage.getItem("parentId");

    let thisParent =
      this.props.parents.find(parent => parent.id === parentId) || {};

    let thisParentsStudents = this.props.students;
    let fullName = thisParent.name|| "Parent"
    
    

    return (
      <React.Fragment>
        <div className="page-component-wrapper  parenthome row d-flex justify-content-center">
          <div className="page-component  col-md-6">
            {Number(sessionStorage.getItem("userType")) === 1 ? (

              <Card>
                {Number(sessionStorage.getItem("userType")) === 1 ? (
                  <div id="parentInfo" style={cardContent}>
                    <h1>{this.state.parent.name}</h1>

                    <h2>Email: {thisParent.emailAddress} </h2>
                    <h2>
                      Phone Number:
                      <a
                        href={"tel:" + thisParent.phoneNumber}
                        className="phone"
                      >
                        {thisParent.phoneNumber}
                      </a>
                    </h2>
                    <br></br>
                  </div>
                ) : (
                  <div id="studentInfo">
                    <h1>Hi, {this.state.name}!</h1>
                    <h2>Your teacher's name: {this.state.teacher.name}</h2>

                    <h2>
                      Your teacher's Email: {this.state.teacher.emailAddress}{" "}
                    </h2>
                    <h2>
                      Your teacher's Phone Number:
                      <a
                        href={"tel:" + this.state.teacher.phoneNumber}
                        className="phone"
                      >
                        {this.state.teacher.phoneNumber}
                      </a>
                    </h2>
                    <br></br>
                  </div>
                )}
                {/* <div id="buttonsDisplay">
                        </div> */}
                <div>
                  <Button
                    type="button"
                    color="danger"
                    onClick={() => {
                      // let id = Number(parentId)
                      console.log(typeof thisParent.id);
                      let answer = window.confirm(
                        "Are you sure you want to delete this student?"
                      );
                      if (answer) {
                        this.props
                          .deleteStudent(thisParent.id)
                          .then(() => this.props.history.push(`/TeacherHome`));
                      }
                    }}
                    className="btn btn-success modalBtn"
                  >
                    Delete This Parent
                  </Button>
                  <Button
                    type="button"
                    color="info"
                    onClick={() => {
                      this.props.history.push(
                        `/students/${thisParent.id}/edit`
                      );
                    }}
                    className="btn btn-success modalBtn"
                  >
                    Edit This Parents's Info
                  </Button>
                </div>
              </Card>
            ) : (
                <h1>Welcome, {fullName}</h1>
            )}
            <br></br>
            <Input
              type="select"
              defaultValue=""
              name="studentList"
              id="selectedStudentId"
              onChange={this.handleFieldChange}
            >
              {this.state.hasOwnProperty("selectedStudentId") === false ? (
                <option value="">Look for a student</option>
              ) : (
                ""
              )}
              {thisParentsStudents
                .filter(
                  student => student.accountId == this.state.parent.accountId
                )
                .map(e => (
                  <option key={e.id} id="students" value={e.id}>
                    {e.name}
                  </option>
                ))}
            </Input>

            {this.state.hasOwnProperty("selectedStudentId") === false ? (
              ""
            ) : (
              <Link to={"/Students/" + this.state.selectedStudentId}>
                <Button
                  type="button"
                  className="btn btn-info tl-btn"
                  onClick={() => {
                    sessionStorage.setItem(
                      "studentId",
                      this.state.selectedStudentId
                    );
                  }}
                >
                  Go to this Student
                </Button>
              </Link>
            )}

            <div id="payments">
              <h2>Payments</h2>
              <PaymentsDisplay {...this.props} user={this.state.parent} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ParentDetail;
