import React, { Component } from "react"
import "./StudentForm.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let id = sessionStorage.getItem("studentId")
console.log(id)
if (id === null) {
    id = sessionStorage.getItem("parentId")
}


class StudentDetail extends Component {
    // state = {
    //     student : []
    // }
    render() {


        let studentId = sessionStorage.getItem("studentId")
        console.log(typeof studentId)
        console.log(this.props.students)
        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}
        let instrument = thisStudent.instrument || {}
        let length = thisStudent.length || {}
        let location = thisStudent.location || {}
        let day = thisStudent.lessonDay || {}



        console.log(thisStudent.id)

        let thisUser = this.props.students.find(user => parseInt(user.id) === parseInt(id)) || {}
        return (

            <React.Fragment>
                <div id="studentInfo">
                    <h1>{thisStudent.name}</h1>
                    <h2>{instrument.name}</h2>
                    {Number(sessionStorage.getItem("parentId") === null) ?

                        <div>
                            <h2>{thisStudent.emailAddress} </h2>
                            <h2>{thisStudent.phoneNumber} </h2>

                        </div> : ""

                    }
                    <h2>{length.length} Minute Lessons</h2>
                    <h2>{thisStudent.lessonTime} </h2>
                    <h2>{location.location} </h2>
                    <h2>{day.day}'s </h2>
                </div>
                <div id="buttonsDisplay">
                    <button type="button"
                        onClick={() => this.props.history.push(`/Students/${thisStudent.id}/notes`)}
                        className="btn btn-success">
                        View Student Notes
                    </button>
                    <div id="divider"></div>
                    {Number(sessionStorage.getItem("parentId") === null) ?
                        <button type="button"
                            onClick={() => this.props.history.push(`/Students/${thisStudent.id}/payments`)}
                            className="btn btn-success">
                            View Student Payments
                    </button> : ""
                    }
                </div>
                <button type="button"
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
                    </button>
                <button type="button"
                    onClick={() => {


                        this.props.history.push(`/students/${thisStudent.id}/edit`)

                    }

                    }
                    className="btn btn-success">
                    Edit This Student's Info
                    </button>


                {Number(sessionStorage.getItem("parentId") === null)
                    ? ""
                    : <Button className="button"
                    type="button"
                    onClick={() => {
                        Number(sessionStorage.getItem("parentId")) === null ?
                            this.props.history.push(`/`)

                            : (Number(sessionStorage.getItem("parentId")) !== 0 ?

                                this.props.history.push(`/parents/${thisUser.id}`) :
                                this.props.history.push(`/students/${thisUser.id}`))
                    }}
                >Back to {thisUser.name}'s Parent Info</Button>

                }
                {/* <Button className="button"
                    type="button"
                    onClick={() => {
                        Number(sessionStorage.getItem("userType")) !== 1 ? 
                        this.props.history.push(`/`)
                        
                        : (Number(sessionStorage.getItem("parentId"))  !== 0 ? 
                            
                            this.props.history.push(`/parents/${thisUser.id}`) :
                            this.props.history.push(`/students/${thisUser.id}`))
                        

                        
                    }}
                >Back to {thisUser.name}'s Info</Button> */}


            </React.Fragment>
        )
    }

}

export default StudentDetail