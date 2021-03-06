
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LessonDetaiInfo from '../../modules/LessonDetaiInfo';

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
        if (id === null) {
            id = sessionStorage.getItem("parentId")
        }

        console.log(date)
        newPayment = {
            userId: id,
            date: document.querySelector("#date").value,
            amount: document.querySelector("#payment").value,
            paymentMethodId: document.querySelector("#paymentMethodId").value,
            teacherId: Number(sessionStorage.getItem("credentials"))
        };
        if (newPayment.paymentMethodId === "") {
            alert("please put payment type")
        } else {

            console.log(newPayment)
            this.props.addPayment(newPayment).then(() => this.toggle())
        }


    };

    render() {
        return (
            <div>
                <Button className="tl-btn" color="success" onClick={this.toggle}>Add Payment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Payment</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="paymentAmount"></label>
                            $<input placeholder="60" 
                                onChange={this.handleFieldChange}
                                id="payment"
                            ></input>
                            <label >Date</label>
                            <input type="text" placeholder={date} id="date" defaultValue={date}></input>
                            <select
                                defaultValue=""
                                name="paymentList"
                                id="paymentMethodId"
                                onChange={this.handleFieldChange}>
                                <option value="">Method</option>
                                {LessonDetaiInfo.paymentMethods.map(e => (
                                    <option key={e.id} id="paymentMethodId" value={e.id} >

                                        {e.method}


                                    </option>
                                ))}
                            </select>
                        </form>
                    </ModalBody>
                    <ModalFooter id="footer">
                        <Button className="modalBtn" color="primary" onClick={this.NewPayment}>Add this payment</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button className="modalBtn" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PaymentsModal;