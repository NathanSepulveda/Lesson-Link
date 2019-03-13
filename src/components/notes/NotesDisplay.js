import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
// import "./StudentForm.css"
import NotesModal from "./NotesModal"

let studentId = sessionStorage.getItem("studentId")

class NotesDisplay extends Component {

    state = {
        lessons: []
    }


    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getLessonsOfStudent(studentId).then(notes => {
            newState.lessons = notes
        }).then(() => {
            this.setState(newState)
        })
    }

    render() {


        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}

        return (
            <React.Fragment>


                <h1>{thisStudent.name}'s Notes</h1>
                {this.state.lessons.map(note =>
                    <div>
                        <div>{note.date}</div>
                        <div>{note.note}</div>
                    </div>

                )}
                <NotesModal></NotesModal>
            </React.Fragment>
        )
    }

}

export default NotesDisplay