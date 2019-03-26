import React, { Component } from 'react'
import "./TeacherHome.css"
import { Link } from "react-router-dom"
import StudentDetail from "./Student/StudentDetail"
import Test from "./Student/Test"

import { withRouter } from "react-router"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';





class TeacherHome extends Component {
    state = {
        parents: this.props.parents,
        student: this.props.students

    }

    handleFieldChange = evt => {

        const stateToChange = {};
        stateToChange[evt.target.id] = Number(evt.target.value);

        this.setState(stateToChange);

    };



    render() {
        sessionStorage.removeItem("studentId")
        sessionStorage.removeItem("parentId")
        sessionStorage.removeItem("accountId")



        let name = this.props.teacherName.name || ""
        let firstName = name.split(" ")[0] || ""

        return (

            <React.Fragment>
                <div className="teacherhome">
                    <div id='search'>
                        <h1>Welcome, {firstName}!</h1>
                        {this.props.students.filter(s => Number(s.teacherId) === Number(sessionStorage.getItem("credentials")))
                            .length === 0 ?
                            ""
                            :
                            <div>
                                Students
                                <Input
                                    type="select"
                                    defaultValue=""
                                    name="studentList"
                                    id="selectedStudentId"
                                    onChange={this.handleFieldChange}

                                >
                                    <option value="">Look for a student</option>
                                    {this.props.students.filter(student => Number(student.parentId) === 0 && Number(student.teacherId) === Number(sessionStorage.getItem("credentials")))
                                        .map(e => (
                                            <option key={e.id} id="students" value={e.id} >
                                                {e.name}

                                            </option>
                                        ))}
                                </Input>
                                <br></br>

                                <Link to={"/Students/" + this.state.selectedStudentId}><Button type="button" onClick={() => {
                                    sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                                }}>Go to this student</Button></Link>
                                {/* <Button type="button" onClick={() => {
                                    sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                                }}>Go to this student</Button> */}



                            </div>

                        }

                        {this.props.parents.filter(p => p.teacherId === Number(sessionStorage.getItem("credentials")))
                            .length === 0 ?
                            "" :
                            <div>
                                <br></br>
                                Parents
                <Input
                                    type="select"
                                    defaultValue=""
                                    name="parentList"
                                    id="selectedParentId"
                                    onChange={this.handleFieldChange

                                    }

                                >
                                    <option value="">Look for a Parent</option>
                                    {this.props.parents.filter(parent => Number(parent.teacherId) === Number(sessionStorage.getItem("credentials")))
                                        .map(e => (
                                            <option key={e.id} id="parents" value={e.id} >

                                                {e.name}


                                            </option>
                                        ))}
                                </Input>
                                <br></br>
                                <Link to={"/parents/" + this.state.selectedParentId}><Button type="button" onClick={() => {
                                    sessionStorage.setItem("parentId", Number(this.state.selectedParentId))

                                }}>Go to this Parent</Button></Link>
                            </div>
                        }

                        <span className="divide"></span>
                        <br></br>
                        <button type="button"
                            onClick={() => this.props.history.push("/students/new")}
                            className="btn btn-success">
                            Add New Student/Parent
                    </button>
                    </div>
                    {/* {
                        this.state.hasOwnProperty("selectedStudentId") ? <div>

                            <Test
                                studentId={this.state.selectedStudentId}
                                {...this.props}
                            ></Test>

                        </div>
                            :
                            ""
                    } */}
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(TeacherHome)