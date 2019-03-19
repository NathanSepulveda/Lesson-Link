import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';



class ParentDetail extends Component {
    // state = {
    //     student : []
    // }
    state = {}

    handleFieldChange = evt => {

        // let selectedStudentId = Number(document.querySelector("#selectedStudentId").value)
        // console.log(selectedStudentId)

        const stateToChange = {};
        stateToChange[evt.target.id] = Number(evt.target.value);
        // stateToChange.selectedStudentId = selectedStudentId 

        this.setState(stateToChange);


    };
    render() {

        sessionStorage.removeItem("studentId")
        let parentId = sessionStorage.getItem("parentId")

        let thisParent = this.props.parents.find(parent => parseInt(parent.id) === parseInt(parentId)) || {}
        let instrument = thisParent.instrument || {}
        let length = thisParent.length || {}
        let location = thisParent.location || {}
        let day = thisParent.lessonDay || {}









        return (
            <React.Fragment>
                <div id="studentInfo">
                    <h1>{thisParent.name}</h1>

                    <h2>{thisParent.emailAddress} </h2>
                    <h2>{thisParent.phoneNumber} </h2>

                    Students
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
                    <div id="divider"></div>
                    <button type="button"
                        onClick={() => this.props.history.push(`/Students/${thisParent.id}/payments`)}
                        className="btn btn-success">
                        View Parent Payments
                    </button>
                </div>
                {/* <button type="button"
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
                    </button>
                <button type="button"
                    onClick={() => {


                        this.props.history.push(`/students/${thisParent.id}/edit`)

                    }

                    }
                    className="btn btn-success">
                    Edit This Parents's Info
                    </button> */}

            </React.Fragment>
        )
    }

}

export default ParentDetail