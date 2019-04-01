import StudentAndParentManager from "../../modules/StudentAndParentManager"
import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Route } from "react-router-dom"
import * as Chart from "chart.js"

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
        decTotal: 0,
        yearlyTotal: 0,
        cashPercentage: 0,
        cashAmount: 0,
        checkPercentage: 0,
        checkAmount: 0,
        electronicpaymentPercentage: 0,
        electronicPaymentAmount: 0

    }

    paymentChart = () => {

        new Chart(document.getElementById("myChart"), {
            "type": "bar", "data": {
                "labels": ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                "datasets": [{
                    "label": "Monthly Incomes", "data": [`$ ${this.state.janTotal}`, this.state.febTotal, this.state.marchTotal, this.state.aprilTotal,
                    this.state.mayTotal, this.state.juneTotal, this.state.julyTotal, this.state.augTotal, this.state.sepTotal,
                    this.state.octTotal, this.state.novTotal, this.state.decTotal],
                    "fill": false, "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                    "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(101, 203, 207)"],

                    "borderWidth": 5
                }]
            }, "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } }
        });
    }

    percentageChart = () => {
        new Chart(document.getElementById("myPieChart"),
            {
                "type": "doughnut", "data": {
                    "labels": ["Cash", "Check", "ElectronicPayment"],
                    "datasets": [{
                        "label": "My First Dataset", "data": [this.state.cashPercentage, this.state.checkPercentage, this.state.electronicpaymentPercentage],
                        "backgroundColor": ["rgb(0, 255, 0)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
                    }]
                }
            });
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

                newState.dec = decTotal



                let total = this.state.payments.reduce((currentTotal, nextValue) => {
                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.yearlyTotal = total



                let cash = this.state.payments.filter(payment => Number(payment.paymentMethodId) === 1)
                console.log(cash)
                let cashAmount = 0
                cash.forEach(payment => {
                    cashAmount += Number(payment.amount)
                })
                console.log(cashAmount)
                newState.cashAmount = cashAmount

                newState.cashPercentage = Number((cashAmount / newState.yearlyTotal).toFixed(2))



                let check = this.state.payments.filter(payment => Number(payment.paymentMethodId) === 2)

                let checkAmount = 0
                check.forEach(payment => {
                    checkAmount += Number(payment.amount)
                })
                newState.checkAmount = checkAmount
                newState.checkPercentage = Number((checkAmount / newState.yearlyTotal).toFixed(2))

                let electronicPayment = this.state.payments.filter(payment => Number(payment.paymentMethodId) === 3)

                let elAmount = 0
                electronicPayment.forEach(payment => {
                    elAmount += Number(payment.amount)
                })
                newState.electronicPaymentAmount = elAmount
                newState.electronicpaymentPercentage = Number((elAmount / newState.yearlyTotal).toFixed(2))




                this.setState(newState)

                let paymentChart = () => {

                    new Chart(document.getElementById("myChart"), {
                        "type": "bar", "data": {
                            "labels": ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            "datasets": [{
                                "label": "Monthly Incomes", "data": [this.state.janTotal, this.state.febTotal, this.state.marchTotal, this.state.aprilTotal,
                                this.state.mayTotal, this.state.juneTotal, this.state.julyTotal, this.state.augTotal, this.state.sepTotal,
                                this.state.octTotal, this.state.novTotal, this.state.decTotal],
                                "fill": false, "backgroundColor": ["rgba(25, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                                "borderColor": ["rgb(25, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(101, 203, 207)", "rgb(14, 12, 235)"],

                                "borderWidth": 5
                            }]
                        }, "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } }
                    });
                }

                let percentageChart = () => {
                    new Chart(document.getElementById("myPieChart"),
                        {
                            "type": "doughnut", "data": {
                                "labels": ["Cash", "Check", "ElectronicPayment"],
                                "datasets": [{
                                    "label": "My First Dataset", "data": [this.state.cashPercentage, this.state.checkPercentage, this.state.electronicpaymentPercentage],
                                    "backgroundColor": ["rgb(40, 200, 40)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
                                }]
                            }
                        });
                }

                paymentChart()
                percentageChart()
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
                {/* <Button onClick={()=> {
                    this.paymentChart()
                    this.percentageChart()
                }}></Button> */}
                <div className="page-component-wrapper row d-flex paymentsummary justify-content-center">
                    <div className="page-component teacherhome col-md-10">
                        <h1>Monthly Incomes</h1>
                        <canvas id="myChart" width="200" height="50"></canvas>
                        <br></br>
                        <h1>Type of Payments</h1>
                        <canvas id="myPieChart" width="200" height="50">Type of Payments</canvas>

                        <div>


                        </div>

                        {/* <div>
                    <h1>January</h1>
                    {this.state.payments.filter(p => p.date.substring(0, 1) === "1")
                        .map(payment =>

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
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

                            <div key={payment.id}>
                                {payment.date} ${payment.amount} {payment.paymentMethod.method}
                            </div>


                        )}
                    <div>
                        Total $ {this.state.decTotal}
                    </div>

                </div> */}
                        <div>
                            <h1>Yearly Total $
                    {
                                    this.state.payments.reduce((currentTotal, nextValue) => {
                                        return currentTotal += Number(nextValue.amount)


                                    }, 0
                                    )}
                            </h1>
                        </div>
                        <Button type="button" onClick={() =>
                            this.outputCSV()
                        }> Click Here to Download Payments Summary</Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}


export default PaymentSummary