import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import { Button} from 'reactstrap';
import "./Notes.css"
import NotesModal from "./NotesModal"
import EditNotesModal from "./EditNotesModal"
import * as emailjs from 'emailjs-com';



class NotesDisplay extends Component {

    state = {
        lessons: [],
        thisStudent: {}
    }


    componentDidMount() {
        let newState = {}

        let id = sessionStorage.getItem("studentId")

        if (id === 0) {
            id = sessionStorage.getItem("parentId")
        } else if (sessionStorage.getItem("parentId") !== 0 && sessionStorage.getItem("studentId") !== 0) {
            id=sessionStorage.getItem("studentId")
        }
        StudentAndParentManager.getStudent(id)
            .then(student => newState.thisStudent = student).then(() => newState.thisStudent.id = id)
            .then(() => StudentAndParentManager.getLessonsOfStudent(id))
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

                {this.state.lessons.length === 0 ? <h1>No notes yet!</h1> : 
            
            this.state.lessons
                    .map(lesson =>
                        <div id={lesson.id} key={lesson.id} className="notesCard">
                            <div className="row">
                                <div className="col-md-12">
                                    <div>{lesson.date}</div>
                                    <div>{lesson.note}</div>
                                </div>
                            </div>
                            {Number(sessionStorage.getItem("userType")) === 1 ?
                                <div className="row">
                                    <div className="col-md-4">
                                        <Button
                                            size="sm"
                                            className="button"
                                            color="info"
                                            onClick={() => this.emailNote(lesson.note)}
                                        >Email this note</Button>

                                    </div>


                                    <div className="col-md-4">
                                        <Button className="button"
                                            size="sm"
                                            color="danger"
                                            type="button"
                                            onClick={() => this.deleteNote(lesson.id)}

                                        >Delete this note?</Button>
                                    </div>
                                    <div className="col-md-4">
                                        <EditNotesModal
                                            currentNote={lesson}
                                            editLessonNote={this.editLessonNote}
                                            {...this.props}
                                        />
                                    </div>


                                </div>
                                : ""}
                        </div>


                    )
            }
                {/* <h1>{this.state.thisStudent.name}'s Notes</h1> */}
                {/* {
                    this.state.lessons
                    .map(lesson =>
                        <div id={lesson.id} className="notesCard">
                            <div className="row">
                                <div className="col-md-12">
                                    <div>{lesson.date}</div>
                                    <div>{lesson.note}</div>
                                </div>
                            </div>
                            {Number(sessionStorage.getItem("userType")) === 1 ?
                                <div className="row">
                                    <div className="col-md-4">
                                        <Button
                                            size="sm"
                                            className="button"
                                            color="info"
                                            onClick={() => this.emailNote(lesson.note)}
                                        >Email this note</Button>

                                    </div>


                                    <div className="col-md-4">
                                        <Button className="button"
                                            size="sm"
                                            color="danger"
                                            type="button"
                                            onClick={() => this.deleteNote(lesson.id)}

                                        >Delete this note?</Button>
                                    </div>
                                    <div className="col-md-4">
                                        <EditNotesModal
                                            currentNote={lesson}
                                            editLessonNote={this.editLessonNote}
                                            {...this.props}
                                        />
                                    </div>


                                </div>
                                : ""}
                        </div>


                    )
                    } */}
                {Number(sessionStorage.getItem("userType")) === 1 ?

                    <div>
                        <NotesModal

                            {...this.props}
                            addNote={this.addNote}

                        />
                    </div>
                    : ""
                }

                {/* <Button className="button"
                    type="button"
                    onClick={() => {
                        Number(sessionStorage.getItem("userType")) === 1 || Number(sessionStorage.getItem("userType")) === 3 ?
                            this.props.history.push(`/students/${this.state.thisStudent.id}`)
                            : this.props.history.push(`/`)
                    }}


                >Back to {this.state.thisStudent.name}'s Info</Button> */}



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