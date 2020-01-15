
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let newMiles = {}
let today = new Date()
let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear()
console.log(today.getHours())
class MileageModal extends React.Component {


    state = {
        modal: false,
        miles: 0,
        date: ""

    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        // const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)

    };

    newMiles = evt => {
        let id = sessionStorage.getItem("studentId")
        if (id === null) {
            id = sessionStorage.getItem("parentId")
        }
        console.log(id)


        newMiles = {
            date: document.querySelector("#date").value,
            amount: this.state.miles
        };
        console.log(newMiles)
        this.props.addMiles(newMiles).then(() => this.toggle())

    };

    render() {

        
        return (
            <div>
                <Button className="tl-btn" color="success" onClick={this.toggle}>Add Miles</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Miles</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="paymentAmount"></label>
                            <input placeholder="60" 
                                onChange={this.handleFieldChange}
                                id="miles"
                            ></input>
                            <label >Date </label>
                            <input type="text" placeholder={date} id="date" defaultValue={date}></input>
                        </form>
                    </ModalBody>
                    <ModalFooter id="footer">
                        <Button className="modalBtn" color="primary" onClick={this.newMiles}>Add these miles</Button>{' '}
                        {/* <Button color="primary" onClick={console.log(newFriendObject)}>Add Friend!</Button>{' '} */}
                        <Button className="modalBtn" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MileageModal;