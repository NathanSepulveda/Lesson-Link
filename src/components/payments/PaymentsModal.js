
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let newPayment = {}
let today = new Date()
let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear()
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
    NewPayment = evt => {
        let id = sessionStorage.getItem("studentId")
        console.log(id)
        if (id === null) {
            id = sessionStorage.getItem("parentId")
        }
        let today = new Date()
        let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear()

        console.log(date)
        newPayment = {
            userId: Number(id),
            date:document.querySelector("#date").value,
            amount: document.querySelector("#notes").value,
            paymentMethodId: document.querySelector("#paymentMethod").value,
            teacherId : Number(sessionStorage.getItem("credentials"))
        };
        
        this.props.addPayment(newPayment).then(() => this.toggle())

    };

    render() {

        
        return (
            <div>
                <Button color="success" onClick={this.toggle}>Add Payment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Lesson Notes</ModalHeader>
                    <ModalBody>
                        <form>
                        <label >Date</label>
                            <input type="text" placeholder={date} id="date" defaultValue={date}></input>
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
                                <option value="">Method</option>
                                {this.props.paymentMethods.map(e => (
                                    <option key={e.id} id="paymentMethod" value={e.id} >

                                        {e.method}


                                    </option>
                                ))}
                            </select>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.NewPayment}>Add this payment</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PaymentsModal;