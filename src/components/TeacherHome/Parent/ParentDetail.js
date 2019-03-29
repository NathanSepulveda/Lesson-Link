import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import StudentAndParentManager from "../../../modules/StudentAndParentManager";
import PaymentsDisplay from "../../payments/PaymentDisplay";



class ParentDetail extends Component {
    // state = {
    //     student : []
    // }
    state = {
        parent: {},
        teacher: {}
    }



    componentDidMount() {
        console.log('hey')
        let newState = {}
        StudentAndParentManager.getOneParent(sessionStorage.getItem("parentId")).then(parent => {
            newState.parent = parent
            console.log(parent)
        }).then(() => StudentAndParentManager.getTeacher(newState.parent.teacherId))
            .then(teacher => {
                newState.teacher = teacher
            }).then(() => this.setState(newState))
    }

    handleFieldChange = evt => {

        // let selectedStudentId = Number(document.querySelector("#selectedStudentId").value)
        // console.log(selectedStudentId)

        const stateToChange = {};
        stateToChange[evt.target.id] = Number(evt.target.value);
        // stateToChange.selectedStudentId = selectedStudentId 

        this.setState(stateToChange);

        console.log(this.state)
    };
    render() {


        let parentId = sessionStorage.getItem("parentId")


        let thisParent = this.props.parents.find(parent => parseInt(parent.id) === parseInt(parentId)) || {}
        let instrument = thisParent.instrument || {}
        let length = thisParent.length || {}
        let location = thisParent.location || {}
        let day = thisParent.lessonDay || {}









        return (
            <React.Fragment>
                <div className="page-component-wrapper row d-flex justify-content-center">
                    <div className="page-component teacherhome col-md-6">
                        <div id="studentInfo">
                            <h1>{this.state.parent.name}</h1>

                            <h2>Email: {thisParent.emailAddress} </h2>
                            <h2>Phone Number:
                            <a href={'tel:' + thisParent.phoneNumber} className="phone">{thisParent.phoneNumber}</a></h2>
                            <br></br>



                            <Input
                                type="select"
                                defaultValue=""
                                name="studentList"
                                id="selectedStudentId"
                                onChange={this.handleFieldChange}

                            >
                                <option value="">Look for a student</option>
                                {this.props.students.filter(student => Number(student.parentId) === Number(parentId))
                                    .map(e => (
                                        <option key={e.id} id="students" value={e.id} >
                                            {e.name}

                                        </option>
                                    ))}
                            </Input>
                            <Link to={"/students/" + this.state.selectedStudentId}><Button type="button" onClick={() => {
                                sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                            }}>Go to this student</Button></Link>

                        </div>
                        <div id="buttonsDisplay">
                            {/* <button type="button"
                        onClick={() => this.props.history.push(`/Students/${thisParent.id}/notes`)}
                        className="btn btn-success">
                        View Student Notes
                    </button> */}

                            {/* <button type="button"
                                onClick={() => this.props.history.push(`/Students/${thisParent.id}/payments`)}
                                className="btn btn-success">
                                View Parent Payments
                    </button> */}
                        </div>
                        <Button type="button" color="danger"
                            onClick={() => {
                                // let id = Number(parentId)
                                console.log(typeof thisParent.id)
                                let answer = window.confirm("Are you sure you want to delete this student?")
                                if (answer) {

                                    this.props.deleteStudent(thisParent.id).then(() => this.props.history.push(`/TeacherHome`))
                                }
                            }
                            }
                            className="btn btn-success">
                            Delete This Parent
                    </Button>
                        <Button type="button" color="info"
                            onClick={() => {


                                this.props.history.push(`/students/${thisParent.id}/edit`)

                            }

                            }
                            className="btn btn-success">
                            Edit This Parents's Info
                    </Button>
                        <div id="payments">
                            <h2>Payments</h2>
                            <PaymentsDisplay
                                
                                {...this.props}
                                user={this.state.parent} />
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default ParentDetail