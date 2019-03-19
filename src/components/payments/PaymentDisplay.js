import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import PaymentsModal from "./PaymentsModal"
import EditPaymentModal from "./EditPaymentModal"
import "./Payments.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Chart from "chart.js"

let id = sessionStorage.getItem("studentId")
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
                
            })
            .then(() => {
                this.setState(newState)
            }).then(() => {

                // let ctx = document.getElementById('myChart').getContext('2d');
                // new Chart(document.getElementById("myChart"), {
                //     "type": "bar", "data": {
                //         "labels": ["January", "February", "March", "April", "May", "June", "July"],
                //         "datasets": [{
                //             "label": `${this.state.thisUser.name}'s Monthly Payments`, "data": [30, this.state.payments[0].amount, 70, 81, 56, 55, 40],
                //             "fill": false, "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                //             "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(101, 203, 207)"],

                //             "borderWidth": 5
                //         }]
                //     }, "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } }
                // });
            }
            )


    }
    addPayment = (paymentObj) => {
        return StudentAndParentManager.addPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(this.state.thisUser.id))
            .then(payments => this.setState({ payments: payments }))
    }

    editPayment = (paymentObj) => {
        return StudentAndParentManager.editPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(this.state.thisUser.id))
            .then(payments => this.setState({ payments: payments }))
    }

    deletePayment = (id) => {
        let answer = window.confirm("Are you sure you want to delete this payment?")
        if (answer) {
            return StudentAndParentManager.delete(id, "payments")
                .then(() => StudentAndParentManager.getPaymentsOfStudent(this.state.thisUser.id))
                .then(payments => this.setState({ payments: payments }))
        }
    }

    render() {





        // let thisUser = this.props.users.find(user => parseInt(user.id) === parseInt(id)) || {}

        return (
            <React.Fragment>
                

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
                                    date={payment.date}
                                    addPayment={this.addPayment}
                                    editPayment={this.editPayment}
                                />
                            </div>

                            : ""}



                    </div>

                )}
                {Number(sessionStorage.getItem("userType")) === 1 ?

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

                            : (Number(sessionStorage.getItem("parentId")) !== 0 ?

                                this.props.history.push(`/parents/${this.state.thisUser.id}`) :
                                this.props.history.push(`/students/${this.state.thisUser.id}`))



                    }}
                >Back to {this.state.thisUser.name}'s Info</Button>
                <canvas id="myChart" width="400" height="100"></canvas>




            </React.Fragment>
        )
    }

}

export default PaymentsDisplay