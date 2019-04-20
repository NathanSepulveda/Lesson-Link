import React, { Component } from "react"
import StudentAndParentManager from "../../../modules/StudentAndParentManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import "./Notes.css"
import FileManager from "../../../modules/FileManager"


let studentId = sessionStorage.getItem("studentId")

class FilesDisplay extends Component {

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


    addNote = (lessonObj) => {
        return StudentAndParentManager.addNote(lessonObj)
            .then(() => StudentAndParentManager.getLessonsOfStudent(this.state.thisStudent.id))
            .then(lessons => lessons.reverse())
            .then(lessons => this.setState({ lessons: lessons }))
    }

    // deleteNote = (id) => {
    //     let answer = window.confirm("Are you sure you want to delete this note?")
    //     if (answer) {
    //         return StudentAndParentManager.deleteNote(id)
    //             .then(() => StudentAndParentManager.getLessonsOfStudent(this.state.thisStudent.id))
    //             .then(lessons => lessons.reverse())
    //             .then(lessons => this.setState({ lessons: lessons }))
    //     }
    // }
    // editLessonNote = (noteObj) => {
    //     return StudentAndParentManager.editLesson(noteObj)
    //         .then(() => StudentAndParentManager.getLessonsOfStudent(this.state.thisStudent.id))
    //         .then(lessons => lessons.reverse())
    //         .then(lessons => this.setState({ lessons: lessons }))
    // }

    // emailNote = (note) => {

    //     var template_params = {
    //         "user_email": this.state.thisStudent.emailAddress,
    //         "text": note
    //     }

    //     var service_id = "default_service";
    //     var template_id = "studentnote";
    //     emailjs.send(service_id, template_id, template_params);

    //     alert("Note sent!")

    // }


    render() {




        return (
            <React.Fragment>

                {this.state.studentMaterials
                    .map(e => (
                        <p>
                            <a key={e.id} target="_blank" rel="noopener noreferrer" className="files" href={e.url} >

                                {e.name}


                            </a>
                        </p>
                    ))}

            </React.Fragment>
        )
    }

}

export default FilesDisplay