import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import PaymentsModal from "./PaymentsModal"
import EditPaymentModal from "./EditPaymentModal"
import "./Payments.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let id = sessionStorage.getItem("studentId") 
console.log(id)
if (id === null) {
    id = sessionStorage.getItem("parentId") 
}




class PaymentsDisplay extends Component {

    state = {
        payments: [],
        thisUser: {}
    }


    componentDidMount() {

        let newState = {}
        StudentAndParentManager.getStudent(Number(this.props.match.params.studentId))
        .then(user => newState.thisUser = user)
        .then(() => StudentAndParentManager.getPaymentsOfStudent(newState.thisUser.id))
        .then(payments => {
            newState.payments = payments
            console.log(payments)
        })
        .then(() => {
            this.setState(newState)
        })
    }
    addPayment = (paymentObj) => {
        return StudentAndParentManager.addPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(id))
            .then(payments => this.setState({ payments: payments }))
    }

    editPayment = (paymentObj) => {
        return StudentAndParentManager.editPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(id))
            .then(payments => this.setState({ payments: payments }))
    }

    deletePayment = (id) => {
        let answer = window.confirm("Are you sure you want to delete this payment?")
        if (answer) {
            return StudentAndParentManager.delete(id, "payments")
                .then(() => StudentAndParentManager.getPaymentsOfStudent(id))
                .then(payments => this.setState({ payments: payments }))
        }
    }

    render() {


        // let thisUser = this.props.users.find(user => parseInt(user.id) === parseInt(id)) || {}

        return (
            <React.Fragment>
                {console.log(this.state)}

                <h1>{this.state.thisUser.name}'s Payments</h1>
                {this.state.payments.map(payment =>
                    <div className="paymentBox" id={payment.id}>
                        <div>{payment.date}</div>
                        <div>${payment.amount} {payment.paymentMethod.method}</div>


                        {Number(sessionStorage.getItem("userType")) === 1 ?

                            <div>
                                <Button className="button"
                                    color="danger"
                                    type="button"
                                    onClick={() => this.deletePayment(payment.id)}

                                >Delete this payment?</Button>
                                <EditPaymentModal
                                    currentPayment={payment}
                                    {...this.props}
                                    addPayment={this.addPayment}
                                    editPayment={this.editPayment}
                                />
                            </div>

                            : ""}



                    </div>

                )}
                {Number(sessionStorage.getItem("userType"))=== 1 ? 
                
                <div>
                    <PaymentsModal

                        {...this.props}
                        addPayment={this.addPayment}

                    />
                </div>
                : ""
            
            }
                <Button className="button"
                    type="button"
                    onClick={() => {
                        Number(sessionStorage.getItem("userType")) !== 1 ? 
                        this.props.history.push(`/`)
                        
                        : (Number(sessionStorage.getItem("parentId"))  !== 0 ? 
                            
                            this.props.history.push(`/parents/${this.state.thisUser.id}`) :
                            this.props.history.push(`/students/${this.state.thisUser.id}`))
                        

                        
                    }}
                >Back to {this.state.thisUser.name}'s Info</Button>

            </React.Fragment>
        )
    }

}

export default PaymentsDisplay