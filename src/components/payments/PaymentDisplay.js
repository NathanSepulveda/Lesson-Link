import React, { Component } from "react"
import StudentAndParentManager from "../../modules/StudentAndParentManager"
import PaymentsModal from "./PaymentsModal"

let studentId = sessionStorage.getItem("studentId")

class PaymentsDisplay extends Component {

    state = {
        payments: []
    }


    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getPaymentsOfStudent(studentId).then(payments => {
            newState.payments = payments
        }).then(() => {
            this.setState(newState)
        })
    }
    addNote = (lessonObj) => {
        return StudentAndParentManager.addNote(lessonObj)
            .then(() => StudentAndParentManager.getLessonsOfStudent(studentId))
            .then(lessons => this.setState({ lessons: lessons }))
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

                <h1>{thisStudent.name}'s Notes</h1>
                {this.state.payments.map(payment =>
                    <div id={payment.id}>
                        <div>{payment.date}</div>
                        <div>${payment.amount} {payment.paymentMethod.method}</div>
                        
                        
                        <button className="button"
                            type="button"
                            onClick={() => this.deletePayment(payment.id)}

                        >Delete this payment?</button>
                    </div>

                )}
                <PaymentsModal
                    {...this.props}
                    
                />
                <button className="button"
                    type="button"
                    onClick={()=> {
                        this.props.history.push(`/students/${thisStudent.id}`)
                    }}
                    

                >Back to {thisStudent.name}'s Info</button>

            </React.Fragment>
        )
    }

}

export default PaymentsDisplay