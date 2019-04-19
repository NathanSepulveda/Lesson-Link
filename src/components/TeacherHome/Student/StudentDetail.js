import React, { Component } from "react"

// import "./StudentForm.css"
import StudentAndParentManager from "../../../modules/StudentAndParentManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import piano from "../../../images/piano.png"
import guitar from "../../../images/icon.png"
import uke from "../../../images/ukelele.png"
import bass from "../../../images/bass-guitar.png"
import prod from "../../../images/settings.png"
import NotesDisplay from "../../notes/NotesDisplay";
import PaymentsDisplay from "../../payments/PaymentDisplay";
import ImageUpload from "../../imageUpload";
import FileManager from "../../../modules/FileManager";


let id = sessionStorage.getItem("studentId")
if (id === null) {
    id = sessionStorage.getItem("parentId")
}




class StudentDetail extends Component {
    state = {
        student: {},
        studentMaterials: [],
        studentMaterialsIds: []
    }

    componentDidMount() {

        let newState = {
            studentMaterials: [],
            studentMaterialsIds: []
        }
        StudentAndParentManager.getStudent(Number(sessionStorage.getItem('studentId')))
            .then((student) => newState.student = student)
            .then(() => newState.student.lessonMaterialsIds.forEach(id => {
                FileManager.getOneFile(id).then(file => {
                    newState.studentMaterials.push(file)
                    newState.studentMaterialsIds.push(file.id)
                    console.log(newState)

                })
            }))

            .then(() => this.setState(newState))



    }


    render() {


        let studentId = sessionStorage.getItem("studentId")
        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}
        let instrument = thisStudent.instrument || {}
        let instrumentImage;
        let length = thisStudent.length || {}
        let location = thisStudent.location || {}
        let day = thisStudent.lessonDay || {}
        if (thisStudent.instrumentId === 1) {
            instrumentImage = piano
        } else if (thisStudent.instrumentId === 2) {
            instrumentImage = guitar
        } else if (thisStudent.instrumentId === 3) {
            instrumentImage = uke
        } else if (thisStudent.instrumentId === 4) {
            instrumentImage = bass
        } else if (thisStudent.instrumentId === 5) {
            instrumentImage = prod
        }





        let thisUser = this.props.students.find(user => parseInt(user.id) === parseInt(id)) || {}
        return (

            <React.Fragment>
                <div className="page-component-wrapper row d-flex studenthome justify-content-center">
                    <div className="page-component studenthome col-md-8">
                        <h1 className="align-middle" id="name">{this.state.student.name}</h1>
                        <div id="pagecontainer">
                            <Card>
                                <div id="studentInfo">
                                    <h2>Student Info</h2>


                                    <div id="instruments">
                                        <img id="instruments" src={instrumentImage} alt={instrument.name}></img>
                                    </div>
                                    {Number(sessionStorage.getItem("parentId") === null) ?

                                        <div>
                                            <h2>Email: {thisStudent.emailAddress} </h2>
                                            <h2>Phone: <a href={'tel:' + thisStudent.phoneNumber} className="phone">{thisStudent.phoneNumber}</a></h2>

                                        </div> : ""

                                    }
                                    <h2>{length.length} Minute Lessons</h2>
                                    <h2>Lesson Time: {thisStudent.lessonTime} </h2>
                                    <h2>Lesson Location: {location.location} </h2>
                                    <h2>Lesson Day: {day.day}'s </h2>
                                    {Number(sessionStorage.getItem("userType")) === 1 ?
                                        <div>
                                            <Button type="button"
                                                color="danger"

                                                onClick={() => {
                                                    // let id = Number(studentId)
                                                    console.log(typeof thisStudent.id)
                                                    let answer = window.confirm("Are you sure you want to delete this student?")
                                                    if (answer) {

                                                        this.props.deleteStudent(thisStudent.id).then(() => this.props.history.push(`/TeacherHome`))
                                                    }
                                                }
                                                }
                                                className="btn btn-success modalBtn">
                                                Delete This Student
                                    </Button>
                                            <Button type="button" color="info"
                                                onClick={() => {


                                                    this.props.history.push(`/students/${thisStudent.id}/edit`)

                                                }

                                                }
                                                className="btn btn-success modalBtn " >
                                                Edit This Student's Info
                                    </Button>
                                        </div> : ""


                                    }
                                </div>

                            </Card>
                            <ImageUpload student={this.state.student} studentMaterials={this.state.studentMaterials}
                                studentMaterialsIds={this.state.studentMaterialsIds}

                            >Hi</ImageUpload>
                            {/* {this.state.student.lessonMaterialsIds.map(l => {
                                <a target="_blank" rel="noopener noreferrer" href={l.url}>File</a>
                            })} */}
                            {this.state.studentMaterials
                                .map(e => (
                                    <p>
                                    <a key={e.id} target="_blank" rel="noopener noreferrer" className="files" href={e.url} >

                                        {e.name}


                                    </a>
                                    </p>
                                ))}

                            <div id="notesPayments">
                                <h2>Notes</h2>
                                <NotesDisplay
                                    {...this.props}
                                />
                            </div>
                            {this.state.student.parentId !== 0 ?

                                ""
                                : <div id="payments">
                                    <h2>Payments</h2>
                                    <PaymentsDisplay
                                        {...this.props}
                                        user={this.state.student} />
                                </div>

                            }
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
                        {Number(sessionStorage.getItem("parentId") === null)
                            ? ""
                            : <Button className="button"
                                type="button"
                                onClick={() => {
                                    Number(sessionStorage.getItem("userType")) === 3 ?
                                        this.props.history.push(`/`)


                                        : (Number(sessionStorage.getItem("parentId")) !== 0 ?

                                            this.props.history.push(`/parents/${sessionStorage.getItem("parentId")}`) :
                                            this.props.history.push(`/students/${thisUser.id}`))
                                    sessionStorage.removeItem("studentId")
                                }}
                            >Back to {this.state.student.name}'s Parent Info</Button>

                        }
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

export default StudentDetail