import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Notes.css"
import NotesModal from "./NotesModal"
import EditNotesModal from "./EditNotesModal"

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
        let answer = window.confirm("Are you sure you want to delete this note?")
        if (answer) {
            return StudentAndParentManager.deleteNote(id)
                .then(() => StudentAndParentManager.getLessonsOfStudent(studentId))
                .then(lessons => this.setState({ lessons: lessons }))
        }
    }
    editLessonNote = (noteObj) => {
        return StudentAndParentManager.editLesson(noteObj)
            .then(() => StudentAndParentManager.getLessonsOfStudent(studentId))
            .then(lessons => this.setState({ lessons: lessons }))
    }


    render() {


        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}

        return (
            <React.Fragment>


                <h1>{thisStudent.name}'s Notes</h1>
                {this.state.lessons.map(note =>
                    <div id={note.id} className="notesCard">
                        <div>{note.date}</div>
                        <div>{note.note}</div>

                        {Number(sessionStorage.getItem("userType")) === 1 ?

                            <div>
                                <Button className="button"
                                    color="danger"
                                    type="button"
                                    onClick={() => this.deleteNote(note.id)}

                                >Delete this note?</Button>
                                <EditNotesModal
                                    currentNote={note}
                                    editLessonNote={this.editLessonNote}
                                    {...this.props}
                                />
                            </div>

                            : ""}

                    </div>

                )}
                {Number(sessionStorage.getItem("userType")) === 1 ?

                    <div>
                        <NotesModal

                            {...this.props}
                            addNote={this.addNote}

                        />
                    </div>
                    : ""

                }
                {/* <NotesModal
                    {...this.props}
                    addNote={this.addNote}
                /> */}
                <Button className="button"
                    type="button"
                    onClick={() => {
                        Number(sessionStorage.getItem("userType")) ===1 ? 
                        this.props.history.push(`/students/${thisStudent.id}`)
                        : this.props.history.push(`/`)
                    }}


                >Back to {thisStudent.name}'s Info</Button>

            </React.Fragment>
        )
    }

}

export default NotesDisplay