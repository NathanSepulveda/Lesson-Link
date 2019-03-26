import React, { Component } from "react"
import "./StudentForm.css"
import StudentAndParentManager from "../../../modules/StudentAndParentManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



let id = sessionStorage.getItem("studentId")
if (id === null) {
    id = sessionStorage.getItem("parentId")
}


class Test extends Component {
    state = {
        student: {}
    }

    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getStudent(Number(sessionStorage.getItem('studentId')))
            .then((student) => newState.student = student)
            .then(() => this.setState(newState))
    }

    render() {


        let studentId = this.props.studentId
        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}
        let instrument = thisStudent.instrument || {}
        let length = thisStudent.length || {}
        let location = thisStudent.location || {}
        let day = thisStudent.lessonDay || {}





        let thisUser = this.props.students.find(user => parseInt(user.id) === parseInt(id)) || {}
        return (

            <React.Fragment>
                <div id="allinfo">
                    <div id="studentInfo">

                        <h1>{this.state.student.name}</h1>
                        <h2>{instrument.name}</h2>
                        {Number(sessionStorage.getItem("parentId") === null) ?

                            <div>
                                <h2>{thisStudent.emailAddress} </h2>
                                <a href={'tel:' + thisStudent.phoneNumber} className="phone">{thisStudent.phoneNumber}</a>

                            </div> : ""

                        }
                        <h2>{length.length} Minute Lessons</h2>
                        <h2>{thisStudent.lessonTime} </h2>
                        <h2>{location.location} </h2>
                        <h2>{day.day}'s </h2>
                    </div>
                    <div id="buttonsDisplay">
                        <Button type="button" color="secondary"
                            onClick={() => this.props.history.push(`/Students/${thisStudent.id}/notes`)}
                        >
                            View Student Notes
                    </Button>
                        <div id="divider"></div>
                        {Number(sessionStorage.getItem("parentId") === null) ?
                            <button type="button"
                                onClick={() => this.props.history.push(`/Students/${thisStudent.id}/payments`)}
                                className="btn btn-success">
                                View Student Payments
                    </button> : ""
                        }
                    </div>
                    {/* hide admin details */}
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
                                className="btn btn-success">
                                Delete This Student
                                    </Button>
                            <Button type="button" color="info"
                                onClick={() => {


                                    this.props.history.push(`/students/${thisStudent.id}/edit`)

                                }

                                }
                                className="btn btn-success" >
                                Edit This Student's Info
                                    </Button>
                        </div> : ""


                    }


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
            </React.Fragment>
        )
    }

}
export default Test