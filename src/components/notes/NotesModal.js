
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as emailjs from 'emailjs-com';




let newLessonNote = {}
let today = new Date()
let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear()
class NotesModal extends React.Component {


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
        newLessonNote["note"] = evt.target.value;

    };
    NewLesson = evt => {



        newLessonNote = {
            studentId: sessionStorage.getItem("studentId"),
            date: document.querySelector("#date").value,
            note: document.querySelector("#notes").value
        };
        
        this.props.addNote(newLessonNote).then(() => this.toggle())

    };

    render() {

        return (
            <div>
                <Button color="success" size="sm"onClick={this.toggle}>Add Lesson Notes</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Lesson Notes</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="note"></label>
                            <label >Date</label>
                            <input type="text" placeholder={date} id="date" defaultValue={date}></input>
                            <br></br>
                            <textarea placeholder="write about the lesson!" id="notes"
                                onChange={this.handleFieldChange}
                            ></textarea>
                        </form>

                    </ModalBody>
                    <script type="text/javascript">
                        (function(){
                            emailjs.init("user_vcKdIHuDqkDlJfNRcsCfB")
                        })();
</script>
                    <ModalFooter id="footer">
                        <Button className="modalBtn" color="primary" onClick={this.NewLesson}>Add this note!</Button>{' '}
                        
                        <Button className="modalBtn" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default NotesModal;