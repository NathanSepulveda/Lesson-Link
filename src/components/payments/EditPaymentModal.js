
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StudentAndParentManager from '../../modules/StudentAndParentManager';

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
        editedPayment[evt.target.id] = evt.target.value;

    };
    EditPayment = evt => {

        let id = sessionStorage.getItem("studentId")
        console.log(id)
        if (id === null) {
            id = sessionStorage.getItem("parentId")
        }
        editedPayment = {
            id: this.props.currentPayment.id,
            userId: Number(id),
            date:document.querySelector("#date").value,
            teacherId: Number(sessionStorage.getItem("credentials")),
            amount: Number(document.querySelector("#paymentAmount").value),
            paymentMethodId: Number(document.querySelector("#paymentMethodId").value)
        };
        
        this.props.editPayment(editedPayment).then(() => this.toggle())

    };



    render() {

        return (
            <div>
                <Button color="info" 
                onClick={this.toggle}

                
                >Edit Payment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Payment</ModalHeader>
                    <ModalBody>
                        <form>
                        <label >Date</label>
                            <input type="text" placeholder={this.props.date} id="date" defaultValue={this.props.date}></input>
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
                                {this.props.paymentMethods.filter(e => Number(e.id) !== Number(this.props.currentPayment.paymentMethodId) )
                                .map(e => (
                                    <option key={e.id} id="paymentMethodId" value={e.id} >

                                        {e.method}


                                    </option>
                                ))}
                            </select>
                        </form>
                    </ModalBody>
                    <ModalFooter id="footer">
                        <Button className="modalBtn" color="primary" onClick={this.EditPayment}>Save</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button className="modalBtn" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditPaymentModal;