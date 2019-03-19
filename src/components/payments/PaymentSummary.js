import StudentAndParentManager from "../../modules/StudentAndParentManager"
import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Route } from "react-router-dom"

const Json2csvParser = require('json2csv').Parser;




class PaymentSummary extends Component {
    state = {
        payments: [],
        janTotal: 0,
        febTotal: 0,
        marchTotal: 0,
        aprilTotal: 0,
        mayTotal: 0,
        juneTotal: 0,
        julyTotal: 0,
        augTotal: 0,
        sepTotal: 0,
        octTotal: 0,
        novTotal: 0,
        decTotal: 0

    }

    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getPayments()
            .then(payments => payments.filter(payment => payment.teacherId === Number(sessionStorage.getItem("credentials"))))
            .then(payments => {
                newState.payments = payments
                return payments
            }).then()
            .then(() =>
                this.setState(newState))
            .then(() => {
                let jan = this.state.payments.filter(p => p.date.substring(0, 1) === "1")

                let janTotal = jan.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.janTotal = janTotal
                let feb = this.state.payments.filter(p => p.date.charAt(0) === "2")

                let febTotal = feb.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.febTotal = febTotal

                let march = this.state.payments.filter(p => p.date.charAt(0) === "3")
                console.log(march)

                let marchTotal = march.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                console.log(marchTotal)
                newState.marchTotal = marchTotal

                let april = this.state.payments.filter(p => p.date.charAt(0) === "4")
                console.log(april)

                let aprilTotal = april.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.aprilTotal = aprilTotal

                let may = this.state.payments.filter(p => p.date.charAt(0) === "5")


                let mayTotal = may.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.mayTotal = mayTotal

                let june = this.state.payments.filter(p => p.date.charAt(0) === "6")


                let juneTotal = june.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.juneTotal = juneTotal


                let july = this.state.payments.filter(p => p.date.charAt(0) === "7")


                let julyTotal = july.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.julyTotal = julyTotal


                let aug = this.state.payments.filter(p => p.date.charAt(0) === "8")


                let augTotal = aug.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.augTotal = augTotal


                let sep = this.state.payments.filter(p => p.date.charAt(0) === "9")


                let sepTotal = sep.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.sepTotal = sepTotal


                let oct = this.state.payments.filter(p => p.date.charAt(1) === "0")
     


                let octTotal = oct.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.octTotal = octTotal

                let nov = this.state.payments.filter(p => p.date.charAt(1) === "1")
               


                let novTotal = nov.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.novTotal = novTotal

                let dec = this.state.payments.filter(p => p.date.charAt(1) === "2")
               


                let decTotal = dec.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.dec = dec

                



                this.setState(newState)
            })


    }

    outputCSV = evt => {

        const fields = ["userId", "date", "amount", "paymentMethodId", "teacherId", "id"]
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
                    <h1>January</h1>
                    {this.state.payments.filter(p => p.date.substring(0, 1) === "1")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}

                    <div>
                        Total $ {this.state.janTotal}
                    </div>
                </div>
                <div>
                    <h1>February</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "2")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.febTotal}
                    </div>

                </div>
                <div>
                    <h1>March</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "3")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.marchTotal}
                    </div>

                </div>
                <div>
                    <h1>April</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "4")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.aprilTotal}
                    </div>

                </div>
                <div>
                    <h1>May</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "5")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.mayTotal}
                    </div>

                </div>
                <div>
                    <h1>June</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "6")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.juneTotal}
                    </div>

                </div>
                <div>
                    <h1>July</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "7")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.julyTotal}
                    </div>

                </div>
                <div>
                    <h1>August</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "8")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.augTotal}
                    </div>

                </div>
                <div>
                    <h1>September</h1>
                    {this.state.payments.filter(p => p.date.charAt(0) === "9")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.sepTotal}
                    </div>

                </div>
                <div>
                    <h1>October</h1>
                    {this.state.payments.filter(p => p.date.charAt(1) === "0")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.octTotal}
                    </div>

                </div>
                <div>
                    <h1>November</h1>
                    {this.state.payments.filter(p => p.date.charAt(1) === "1")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.novTotal}
                    </div>

                </div>
                <div>
                    <h1>December</h1>
                    {this.state.payments.filter(p => p.date.charAt(1) === "2")
                        .map(payment =>

                            <div>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.decTotal}
                    </div>

                </div>
                <div>
                    Yearly Total $
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