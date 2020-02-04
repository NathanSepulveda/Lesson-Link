import React, { Component } from "react";

// import "./StudentForm.css"
import StudentAndParentManager from "../../../modules/StudentAndParentManager";
import { Button, Card, Container, Col, Row } from "reactstrap";
import piano from "../../../images/piano.png";
import guitar from "../../../images/icon.png";
import uke from "../../../images/ukelele.png";
import bass from "../../../images/bass-guitar.png";
import prod from "../../../images/settings.png";
import NotesDisplay from "../../notes/NotesDisplay";
import PaymentsDisplay from "../../payments/PaymentDisplay";
import ImageUpload from "../../imageUpload";
import FileManager from "../../../modules/FileManager";
import LessonDetaiInfo from "../../../modules/LessonDetaiInfo";

let id = sessionStorage.getItem("studentId");
if (id === null) {
  id = sessionStorage.getItem("parentId");
}

const materialsList = {
  display: "flex",
  flexDirection: "column"
};

const headings = {
  margin: "30px 0 5px 0",
  textDecoration: "underline"
};

const cardContent = {
    padding: "10px 10px 0 10px"
}

class StudentDetail extends Component {
  state = {
    student: {},
    studentMaterials: [],
    number: 2
  };

  componentDidMount() {
    let newState = {
      studentMaterials: []
    };
    let ID = sessionStorage.getItem("studentId");
    StudentAndParentManager.getStudent(ID)
      .then(student => (newState.student = student))
      .then(student => (newState.student.id = ID))
      .then(() =>
        newState.student.lessonMaterialsIds.forEach(id => {
          if (id) {
            FileManager.getOneFile(id).then(file => {
              newState.studentMaterials.push(file);
            });
          }
        })
      )

      .then(() => this.setState(newState));
  }
  updateStudentMaterials = materialsIds => {
    let newState = {
      studentMaterials: []
    };
    materialsIds.forEach(id => {
      FileManager.getOneFile(id).then(file => {
        newState.studentMaterials.push(file);
        console.log(newState);
        this.setState(newState);
      });
    });
  };

  render() {
    let thisStudent = this.state.student || {};
    let instrument =
      LessonDetaiInfo.instruments.find(
        inst => inst.id == thisStudent.instrumentId
      ) || {};
    let instrumentImage;
    let length =
      LessonDetaiInfo.lengths.find(len => len.id == thisStudent.lengthId) || {};
    let location =
      LessonDetaiInfo.locations.find(loc => loc.id == thisStudent.locationId) ||
      {};
    let day =
      LessonDetaiInfo.lessonDays.find(ld => ld.id == thisStudent.lessonDayId) ||
      {};
    if (thisStudent.instrumentId === 1) {
      instrumentImage = piano;
    } else if (thisStudent.instrumentId === 2) {
      instrumentImage = guitar;
    } else if (thisStudent.instrumentId === 3) {
      instrumentImage = uke;
    } else if (thisStudent.instrumentId === 4) {
      instrumentImage = bass;
    } else if (thisStudent.instrumentId === 5) {
      instrumentImage = prod;
    }

    let thisUser = this.props.students.find(user => user.id == id) || {};
    return (
      <React.Fragment>
        <div className="page-component-wrapper row d-flex studenthome justify-content-center">
          <div className="page-component studenthome col-md-8">
            <h1 className="align-middle" id="name">
              {this.state.student.name}
            </h1>
            <div id="pagecontainer">
            {Number(sessionStorage.getItem("userType")) === 1 ? (
              <Card>
                <div id="studentInfo" style ={cardContent}>
                  <h2>Student Info</h2>

                  <div id="instruments">
                    <img
                      id="instruments"
                      src={instrumentImage}
                      alt={instrument.name}
                    ></img>
                  </div>

                    <div>
                      <h2>Email: {this.state.student.emailAddress} </h2>
                      <h2>
                        Phone:{" "}
                        <a
                          href={"tel:" + this.state.student.phoneNumber}
                          className="phone"
                        >
                          {thisStudent.phoneNumber}
                        </a>
                      </h2>
                    </div>

                  <h2>{length.length} Minute Lessons</h2>
                  <h2>Lesson Time: {thisStudent.lessonTime} </h2>
                  <h2>Lesson Location: {location.location} </h2>
                  <h2>Lesson Day: {day.day}'s </h2>
                </div>
                  
                    <Container>
                      <Row xs="2">
                      <Button
                        type="button"
                        color="danger"
                        className="col-6"
                        onClick={() => {
                          // this.changeNumber() i do not know where this came from
                          // let id = Number(studentId)
                          let answer = window.confirm(
                            "Are you sure you want to delete this student?"
                          );
                          if (answer) {
                            this.props
                              .deleteStudent(thisStudent.id)
                              .then(() =>
                                this.props.history.push(`/TeacherHome`)
                              );
                          }
                        }}
                        className="btn btn-success modalBtn"
                      >
                        Delete This Student
                      </Button>
                      <Button
                      className="col-6"
                        type="button"
                        color="info"
                        onClick={() => {
                          this.props.history.push(
                            `/students/${this.state.student.id}/edit`
                          );
                        }}
                        className="btn btn-success modalBtn "
                      >
                        Edit This Student's Info
                      </Button>
                      </Row>
                      </Container>
                  
              </Card>
              ) : ""}
              <ImageUpload
                student={this.state.student}
                updateStudentMaterials={this.updateStudentMaterials}
                changeNumber={this.changeNumber}
              ></ImageUpload>

              <h1 style={headings}>Student Materials</h1>
              <div style={materialsList}>
                {this.state.studentMaterials.map(e => (
                  <a
                    key={e.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="files"
                    href={e.url}
                  >
                    {e.name}
                  </a>
                ))}
              </div>

              <div id="notesPayments">
                <h2 style={headings}>Notes</h2>
                <NotesDisplay {...this.props} />
              </div>
              {this.state.student.parentId !== 0 ? (
                ""
              ) : (
                <div id="payments">
                  <h2 style={headings}>Payments </h2>
                  <PaymentsDisplay {...this.props} user={this.state.student} />
                </div>
              )}
            </div>

            {/* hide for just now */}
            <div id="buttonsDisplay">
              {/* <Button type="button" color="secondary"
                            onClick={() => this.props.history.push(`/Students/${thisStudent.id}/notes`)}
                        >
                            View Student Notes
                    </Button> */}

              {/* {Number(sessionStorage.getItem("parentId") === null) ?
                                <button type="button"
                                    onClick={() => this.props.history.push(`/Students/${thisStudent.id}/payments`)}
                                    className="btn btn-success">
                                    View Student Payments
                    </button>
                                : ""
                            } */}
            </div>
            {/* hide admin details */}

            {/* {Number(sessionStorage.getItem("parentId") === null)
                    ? ""
                    : <Button className="button"
                        type="button"
                        onClick={() => {
                            Number(sessionStorage.getItem("userType")) === null ?
                                this.props.history.push(`/`)


                                : (Number(sessionStorage.getItem("parentId")) !== 0 ?

                                    this.props.history.push(`/parents/${sessionStorage.getItem("parentId")}`) :
                                    this.props.history.push(`/students/${thisUser.id}`))
                            sessionStorage.removeItem("studentId")
                        }}
                    >Back to {this.state.student.name}'s Parent Info</Button>

                } */}
            {sessionStorage.getItem("parentId") === null ? (
              ""
            ) : (
              <Button
                className="button"
                type="button"
                onClick={() => {
                  Number(sessionStorage.getItem("userType")) === 3
                    ? this.props.history.push(`/`)
                    : Number(sessionStorage.getItem("parentId")) !== 0
                    ? this.props.history.push(
                        `/parents/${sessionStorage.getItem("parentId")}`
                      )
                    : this.props.history.push(`/students/${thisUser.id}`);
                  sessionStorage.removeItem("studentId");
                }}
              >
                Back to {this.state.student.name}'s Parent Info
              </Button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentDetail;
