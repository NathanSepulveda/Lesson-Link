import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import PaymentsModal from "./PaymentsModal"
import EditPaymentModal from "./EditPaymentModal"
import "./Payments.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let studentId = sessionStorage.getItem("studentId")

class PaymentsDisplay extends Component {

    state = {
        payments: []
    }


    componentDidMount() {
        console.log(typeof studentId)
        let newState = {}
        StudentAndParentManager.getPaymentsOfStudent(studentId).then(payments => {
            newState.payments = payments
            console.log(payments)
        }).then(() => {
            this.setState(newState)
        })
    }
    addPayment = (paymentObj) => {
        return StudentAndParentManager.addPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(studentId))
            .then(payments => this.setState({ payments: payments }))
    }

    editPayment = (paymentObj) => {
        return StudentAndParentManager.editPayment(paymentObj)
        .then(() => StudentAndParentManager.getPaymentsOfStudent(studentId))
        .then(payments => this.setState({ payments: payments }))
      }

    deletePayment = (id) => {
        let answer = window.confirm("Are you sure you want to delete this payment?")
        if (answer) {
            return StudentAndParentManager.delete(id, "payments")
                .then(() => StudentAndParentManager.getPaymentsOfStudent(studentId))
                .then(payments => this.setState({ payments: payments }))
        }
    }

    render() {


        let thisStudent = this.props.students.find(student => parseInt(student.id) === parseInt(studentId)) || {}

        return (
            <React.Fragment>
                {console.log(this.state)}

                <h1>{thisStudent.name}'s Payments</h1>
                {this.state.payments.map(payment =>
                    <div className="paymentBox" id={payment.id}>
                        <div>{payment.date}</div>
                        <div>${payment.amount} {payment.paymentMethod.method}</div>


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

                )}
                <PaymentsModal
                
                    {...this.props}
                    addPayment={this.addPayment}

                />
                <Button className="button"
                    type="button"
                    onClick={() => {
                        this.props.history.push(`/students/${thisStudent.id}`)
                    }}


                >Back to {thisStudent.name}'s Info</Button>

            </React.Fragment>
        )
    }

}

export default PaymentsDisplay