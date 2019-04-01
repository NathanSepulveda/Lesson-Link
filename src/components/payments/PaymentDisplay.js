import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import PaymentsModal from "./PaymentsModal"
import EditPaymentModal from "./EditPaymentModal"
import "./Payments.css"
import { UncontrolledCollapse, Collapse, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody } from 'reactstrap';

const Json2csvParser = require('json2csv').Parser;

let id = sessionStorage.getItem("studentId")
if (id === null) {
    id = sessionStorage.getItem("parentId")
}




class PaymentsDisplay extends Component {

    // state = {
    //     payments: [],
    //     thisUser: {}
    // }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        // this.onExited = this.onExited.bind(this);
        this.state = {
            collapse: false,
            payments: [],
            thisUser: {}
        };
    }

    toggle() {
        let newState = {
            collapse: !this.state.collapse,
            payments: [],
            thisUser: {}
        }
        let id = Number(sessionStorage.getItem("studentId"))
        console.log(id)
        if (id === 0) {
            id = Number(sessionStorage.getItem("parentId"))
        }
        console.log(id)

        StudentAndParentManager.getPaymentsOfStudent(id)
            .then(payments => {
                newState.payments = payments

            })
            .then(() => {
                this.setState(newState)
            })
        this.setState(newState)

    }
    // onExited() {

    //     let newState = {
    //         status: 'Closed',
    //         payments: [],
    //         thisUser: {}
    //     }
    //     let id = Number(sessionStorage.getItem("studentId"))
    //     console.log(id)
    //     if (id === 0) {
    //         id = Number(sessionStorage.getItem("parentId"))
    //     }
    //     console.log(id)

    //     StudentAndParentManager.getPaymentsOfStudent(id)
    //         .then(payments => {
    //             newState.payments = payments

    //         })
    //         .then(() => {
    //             this.setState(newState)
    //         })
    //     this.setState(newState)
    // }




    componentDidMount() {

        let newState = {}
        let id = Number(sessionStorage.getItem("studentId"))
        console.log(id)
        if (id === 0) {
            id = Number(sessionStorage.getItem("parentId"))
        }
        console.log(id)

        StudentAndParentManager.getPaymentsOfStudent(id)
            .then(payments => {
                newState.payments = payments

            })
            .then(() => {
                this.setState(newState)
            })


    }


    outputCSV = evt => {

        const fields = ["userId", "date", "amount", "paymentMethodId", "teacherId"]
        StudentAndParentManager.getPayments()
            .then(payments => payments.filter(payment => payment.userId === Number(sessionStorage.getItem("studentId"))))
            .then(payments => {
                console.log(payments)
                const json2csvParser = new Json2csvParser({ fields });
                const csv = json2csvParser.parse(payments)
                console.log(csv)
                return csv




            }).then((csv) => window.open("data:text/csv;charset=utf-8," + escape(csv)))
    }
    addPayment = (paymentObj) => {
        return StudentAndParentManager.addPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(this.state.thisUser.id))
            .then(payments => this.setState({ payments: payments,
                collapse: !this.state.collapse
            }))
    }

    editPayment = (paymentObj) => {
        return StudentAndParentManager.editPayment(paymentObj)
            .then(() => StudentAndParentManager.getPaymentsOfStudent(this.state.thisUser.id))
            .then(payments => this.setState({
                payments: payments,
                collapse: !this.state.collapse
               }))
    }

    deletePayment = (id) => {
        let answer = window.confirm("Are you sure you want to delete this payment?")
        if (answer) {
            return StudentAndParentManager.delete(id, "payments")
                .then(() => StudentAndParentManager.getPaymentsOfStudent(this.state.thisUser.id))
                .then(payments => this.setState({
                     payments: payments,
                     collapse: !this.state.collapse
                    }))
        }
    }

    render() {





        // let thisUser = this.props.users.find(user => parseInt(user.id) === parseInt(id)) || {}

        return (
            <React.Fragment>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Payments</Button>
                <Collapse isOpen={this.state.collapse}
                    // onExited={this.onExited}
                >
                    {this.state.payments
                        .map(payment =>
                            <div className="row paymentBox">
                                <div className="col-md-12" key={payment.id} id={payment.id}>

                                    <div>{payment.date}</div>
                                    <div>${payment.amount} {payment.paymentMethod.method}</div>
                                    {/* </div> */}

                                    {Number(sessionStorage.getItem("userType")) === 1 ?
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Button className="button"
                                                    color="danger"
                                                    type="button"
                                                    onClick={() => this.deletePayment(payment.id)}

                                                >Delete payment?</Button>
                                            </div>
                                            <div className="col-md-6">

                                                <EditPaymentModal
                                                    currentPayment={payment}
                                                    {...this.props}
                                                    date={payment.date}
                                                    addPayment={this.addPayment}
                                                    editPayment={this.editPayment}
                                                />
                                            </div>
                                        </div>

                                        : ""}



                                </div>
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
                    {/* <Button className="button"
type="button"
onClick={() => {
Number(sessionStorage.getItem("userType")) !== 1 ?
this.props.history.push(`/`)

: (Number(sessionStorage.getItem("parentId")) !== 0 ?

this.props.history.push(`/parents/${this.state.thisUser.id}`) :
this.props.history.push(`/students/${this.state.thisUser.id}`))



}}
>Back to {this.state.thisUser.name}'s Info</Button> */}
                    <br></br>


                    <Button type="button" onClick={() =>
                        this.outputCSV()
                    }> Click Here to Download Payments Summary</Button>
                </Collapse>





            </React.Fragment>
        )
    }

}

export default PaymentsDisplay