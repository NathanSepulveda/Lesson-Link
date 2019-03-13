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
    addNote = (lessonObj) => {
        return StudentAndParentManager.addNote(lessonObj)
            .then(() => StudentAndParentManager.getLessonsOfStudent(studentId))
            .then(lessons => this.setState({ lessons: lessons }))
    }

    deleteNote = (id) => {
        return StudentAndParentManager.deleteNote(id)
            .then(() => StudentAndParentManager.getLessonsOfStudent(studentId))
            .then(lessons => this.setState({ lessons: lessons }))
    }

    render() {


        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}

        return (
            <React.Fragment>


                <h1>{thisStudent.name}'s Notes</h1>
                {this.state.lessons.map(note =>
                    <div id={note.id}>
                        <div>{note.date}</div>
                        <div>{note.note}</div>
                        <button className="button"
                            type="button"
                            onClick={() => this.deleteNote(note.id)}

                        >Delete this note?</button>
                    </div>

                )}
                <NotesModal
                    {...this.props}
                    addNote={this.addNote}
                />

            </React.Fragment>
        )
    }

}

export default NotesDisplay