
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let editedLessonNote = {}
class EditNotesModal extends React.Component {


    state = {
        modal: false,

    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        // const stateToChange = {};
        editedLessonNote["note"] = evt.target.value;

    };
    NewLesson = evt => {

        
        editedLessonNote = {
            id: this.props.currentNote.id,
            studentId: sessionStorage.getItem("studentId"),
            date: document.querySelector("#date").value,
            note: document.querySelector("#notes").value
        };
        
        this.props.editLessonNote(editedLessonNote).then(() => this.toggle())

    };

    render() {

        return (
            <div>
                <Button color="info" size="sm" onClick={this.toggle}>Edit This Note</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal">
                    <ModalHeader toggle={this.toggle}>Edit Lesson Notes</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="note"></label>
                            <label >Date</label>
                            <input type="text" placeholder={this.props.currentNote.date} id="date" defaultValue={this.props.currentNote.date}></input>
                            <br></br>
                            <textarea placeholder="write about the lesson!" defaultValue={this.props.currentNote.note} id="notes"
                                onChange={this.handleFieldChange}
                            ></textarea>
                        </form>
                    </ModalBody>
                    <ModalFooter id="footer">
                        <Button className="modalBtn" color="primary" onClick={this.NewLesson}>Edit this note!</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button className="modalBtn" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditNotesModal;