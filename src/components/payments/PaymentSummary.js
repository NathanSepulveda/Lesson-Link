import StudentAndParentManager from "../../modules/StudentAndParentManager"
import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Route } from "react-router-dom"

const Json2csvParser = require('json2csv').Parser;




class PaymentSummary extends Component {
    state = {
        payments: []
    }

    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getPayments()
            .then(payments => payments.filter(payment => payment.teacherId === Number(sessionStorage.getItem("credentials"))))
            .then(payments => {
                newState.payments = payments
            }).then(() =>
                this.setState(newState)
            )

    }
    total = 0
    outputCSV = evt => {

        const fields = ["studentId", "id", "date", "amount", "paymentMethodId"]
        StudentAndParentManager.getPayments()
            .then(payments => payments.filter(payment => payment.teacherId === Number(sessionStorage.getItem("credentials"))))
            .then(payments => {
                console.log(payments)
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(payments)
                console.log(csv)
                return csv




            }).then((csv) => window.open("data:text/csv;charset=utf-8," + escape(csv)))
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    {this.state.payments.map(payment =>

                        <div>
                            {payment.date} ${payment.amount} {payment.paymentMethod.method}
                        </div>


                    )}

                </div>
                <div>
                    Total $
                    {
                        this.state.payments.reduce((currentTotal, nextValue) => {
                         return currentTotal += Number(nextValue.amount)

                        
                        }, 0
                        )}
                </div>
                <button type="button" onClick={() =>
                    this.outputCSV()
                }> Click Here to Download Payments Summary</button>
            </React.Fragment>
        )
    }

}


export default PaymentSummary