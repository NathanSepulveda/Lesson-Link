
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StudentAndParentManager from '../../modules/StudentAndParentManager';

let newPayment = {}
let editedPayment = {

}
class EditPaymentModal extends React.Component {

    editedPayment = {

    }
    state = {
        modal: false,
        paymentMethod: 1

    }

    componentDidMount() {
        StudentAndParentManager.getStudent(Number(this.props.match.params.studentId))
        
    }

    

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        // const stateToChange = {};
        editedPayment[evt.target.id] = evt.target.value;

    };
    EditPayment = evt => {

        let today = new Date()
        let date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()

        console.log(date)
        editedPayment = {
            id: this.props.currentPayment.id,
            studentId: Number(sessionStorage.getItem("studentId")),
            date: date,
            amount: Number(document.querySelector("#paymentAmount").value),
            paymentMethodId: Number(document.querySelector("#paymentMethodId").value)
        };
        console.log(editedPayment)
        this.props.editPayment(editedPayment).then(() => this.toggle())

    };



    render() {

        return (
            <div>
                <Button color="info" 
                onClick={this.toggle}

                
                >Edit this payment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Payment</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="paymentAmount"></label>
                            $<input placeholder="60" id="paymentAmount"
                                onChange={this.handleFieldChange}
                                defaultValue={this.props.currentPayment.amount}
                            ></input>

                            <select
                                
                                name="paymentList"
                                id="paymentMethodId"
                                onChange={this.handleFieldChange

                                }

                            >
                                <option value={this.props.currentPayment.paymentMethodId}>{this.props.currentPayment.paymentMethod.method}</option>
                                {this.props.paymentMethods.map(e => (
                                    <option key={e.id} id="paymentMethodId" value={e.id} >

                                        {e.method}


                                    </option>
                                ))}
                            </select>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.EditPayment}>Edit this payment</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditPaymentModal;