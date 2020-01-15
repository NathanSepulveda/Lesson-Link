import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager";



class StudentDetail extends Component {

    state = {
        teacher: {},
        student: {}
    }
    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getStudent(sessionStorage.getItem("credentials")).then((student => 
            newState.student = student))
        .then(()=> StudentAndParentManager.getTeacher(newState.student.teacherId))
        .then(teacher => {
            newState.teacher = teacher
        }).then(() => this.setState(newState))

    }


    render() {



        let studentId = sessionStorage.getItem("credentials")
        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}
        let instrument = thisStudent.instrument || {}
        let length = thisStudent.length || {}
        let location = thisStudent.location || {}
        let day = thisStudent.lessonDay || {}








        return (
            <React.Fragment>
                <div id="studentInfo">
                    <h1>{thisStudent.name}</h1>
                    <h2>{instrument.name}</h2>
                    <h2>Your teacher's email :</h2>
                    <h4>{this.state.teacher.emailAddress} </h4>
                    <h2>Your teacher's Phone Number:</h2>
                    <a href={'tel:' + this.state.teacher.phoneNumber} className="phone">{this.state.teacher.phoneNumber}</a>
                    
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
                    <button type="button"
                        onClick={() => this.props.history.push(`/Students/${thisStudent.id}/payments`)}
                        className="btn btn-success">
                        View Student Payments
                    </button>
                </div>


            </React.Fragment>
        )
    }

}

export default StudentDetail