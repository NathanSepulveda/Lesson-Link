import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Notes.css"
import NotesModal from "./NotesModal"
import EditNotesModal from "./EditNotesModal"
import * as emailjs from 'emailjs-com';

let studentId = sessionStorage.getItem("studentId")

class NotesDisplay extends Component {

    state = {
        lessons: [],
        thisStudent: {}
    }


    componentDidMount() {
        let newState = {}

        StudentAndParentManager.getStudent(Number(this.props.match.params.studentId))
            .then(student => newState.thisStudent = student)
            .then(() => StudentAndParentManager.getLessonsOfStudent(this.props.match.params.studentId))
            .then(notes => {
                let lessons = notes.reverse()
                newState.lessons = lessons
            })
            .then(() => {
                this.setState(newState)
            })
    }


    addNote = (lessonObj) => {
        return StudentAndParentManager.addNote(lessonObj)
            .then(() => StudentAndParentManager.getLessonsOfStudent(this.state.thisStudent.id))
            .then(lessons => lessons.reverse())
            .then(lessons => this.setState({ lessons: lessons }))
    }

    deleteNote = (id) => {
        let answer = window.confirm("Are you sure you want to delete this note?")
        if (answer) {
            return StudentAndParentManager.deleteNote(id)
                .then(() => StudentAndParentManager.getLessonsOfStudent(this.state.thisStudent.id))
                .then(lessons => lessons.reverse())
                .then(lessons => this.setState({ lessons: lessons }))
        }
    }
    editLessonNote = (noteObj) => {
        return StudentAndParentManager.editLesson(noteObj)
            .then(() => StudentAndParentManager.getLessonsOfStudent(this.state.thisStudent.id))
            .then(lessons => lessons.reverse())
            .then(lessons => this.setState({ lessons: lessons }))
    }

    emailNote = (note) => {

        var template_params = {
            "user_email": this.state.thisStudent.emailAddress,
            "text": note
        }

        var service_id = "default_service";
        var template_id = "studentnote";
        emailjs.send(service_id, template_id, template_params);

        alert("Note sent!")

    }


    render() {




        return (
            <React.Fragment>


                {/* <h1>{this.state.thisStudent.name}'s Notes</h1> */}
                {this.state.lessons
                    .map(lesson =>
                        <div id={lesson.id} className="notesCard">
                            <div>{lesson.date}</div>
                            <div>{lesson.note}</div>
                            <div className="buttons">

                                <Button
                                    
                                    size="sm"
                                    className="button"
                                    color="info"
                                    onClick={() => this.emailNote(lesson.note)}
                                >Email this note</Button>

                                {Number(sessionStorage.getItem("userType")) === 1 ?

                                    <div className="buttons">
                                        <Button className="button"
                                        size="sm"   
                                            color="danger"
                                            type="button"
                                            onClick={() => this.deleteNote(lesson.id)}

                                        >Delete this note?</Button>
                                        <EditNotesModal
                                            currentNote={lesson}
                                            editLessonNote={this.editLessonNote}
                                            {...this.props}
                                        />
                                    </div>

                                    : ""}
                            </div>
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

                <Button className="button"
                    type="button"
                    onClick={() => {
                        Number(sessionStorage.getItem("userType")) === 1 || Number(sessionStorage.getItem("userType")) === 3 ?
                            this.props.history.push(`/students/${this.state.thisStudent.id}`)
                            : this.props.history.push(`/`)
                    }}


                >Back to {this.state.thisStudent.name}'s Info</Button>



                <script type="text/javascript">
                    (function(){
                        emailjs.init("user_vcKdIHuDqkDlJfNRcsCfB")
                    })();
</script>

            </React.Fragment>
        )
    }

}

export default NotesDisplay