
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let newPayment = {}
class PaymentsModal extends React.Component {


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
        newPayment[evt.target.id] = evt.target.value;

    };
    // NewPayment = evt => {

    //     let today = new Date()
    //     let date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()

    //     console.log(date)
    //     newPayment = {
    //         studentId: Number(sessionStorage.getItem("studentId")),
    //         date: date,
    //         amount: document.querySelector("#notes").value
    //     };
    //     console.log(newLessonNote)
    //     this.props.addNote(newLessonNote).then(() => this.toggle())

    // };

    render() {

        {console.log(newPayment)}
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Add Lesson Notes</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Lesson Notes</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="paymentAmount"></label>
                            $<input placeholder="60" id="notes"
                                onChange={this.handleFieldChange}
                            ></input>
                            <select
                                defaultValue=""
                                name="paymentList"
                                id="paymentList"
                                onChange={this.handleFieldChange

                                }

                            >
                                <option value="">Look for a method</option>
                                {this.props.paymentMethods.map(e => (
                                    <option key={e.id} id="paymentMethod" value={e.id} >

                                        {e.method}


                                    </option>
                                ))}
                            </select>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.NewLesson}>Add this note!</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PaymentsModal;