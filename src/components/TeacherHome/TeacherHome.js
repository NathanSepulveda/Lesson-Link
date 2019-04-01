import React, { Component } from 'react'
import "./TeacherHome.css"
import { Link } from "react-router-dom"
import StudentDetail from "./Student/StudentDetail"
import Test from "./Student/Test"
import piano from "../../images/darkerPiano.jpg"
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

    // componentDidMount () {
    //     function myFunction(x) {
    //         if (x.matches) { // If media query matches
    //             document.body.style.backgroundColor = "green";
    //         } else {
    //          document.body.style.backgroundColor = "pink";
    //         }
    //       }

    //       var x = window.matchMedia("(max-width: 700px)")
    //       myFunction(x) // Call listener function at run time
    //       x.addListener(myFunction) // Attach listener function on state changes
    // }


    render() {
        sessionStorage.removeItem("studentId")
        sessionStorage.removeItem("parentId")
        sessionStorage.removeItem("accountId")



        let name = this.props.teacherName.name || ""
        let firstName = name.split(" ")[0] || ""

        return (

            <React.Fragment>
                <div className="page-component-wrapper row d-flex justify-content-center" id="HM">
                    <div className="page-component teacherhome col-md-6">
                        <div id='search' className="">
                            <h1 className="tl-heading">Welcome, {firstName}!</h1>
                            {this.props.students.filter(s => Number(s.teacherId) === Number(sessionStorage.getItem("credentials")))
                                .length === 0 ?
                                ""
                                :
                                <div className="search-section">
                                    <Input
                                        type="select"
                                        defaultValue=""
                                        name="studentList"
                                        id="selectedStudentId"
                                        onChange={this.handleFieldChange}

                                    >
                                        {this.state.hasOwnProperty("selectedStudentId") === false ?
                                            <option value="">Look for a student</option> : ""}
                                        {this.props.students.filter(student => Number(student.parentId) === 0 && Number(student.teacherId) === Number(sessionStorage.getItem("credentials")))
                                            .map(e => (
                                                <option key={e.id} id="students" value={e.id} >
                                                    {e.name}

                                                </option>
                                            ))}
                                    </Input>

                                    {this.state.hasOwnProperty("selectedStudentId") === false ?
                                        ""
                                        :
                                        <Link to={"/Students/" + this.state.selectedStudentId}><Button type="button" className="btn btn-info tl-btn" onClick={() => {



                                            sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))


                                        }}>Go to this Student</Button></Link>
                                    }

                                    {/* <Link to={"/Students/" + this.state.selectedStudentId}><Button className="btn btn-info tl-btn" type="button" onClick={() => {
                                        sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                                    }}>Go to this student</Button></Link> */}
                                    {/* <Button type="button" onClick={() => {
                                    sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                                }}>Go to this student</Button> */}



                                </div>

                            }

                            {this.props.parents.filter(p => p.teacherId === Number(sessionStorage.getItem("credentials")))
                                .length === 0 ?
                                "" :
                                <div className="search-section">

                                    <Input
                                        type="select"
                                        defaultValue=""
                                        name="parentList"
                                        id="selectedParentId"
                                        onChange={this.handleFieldChange

                                        }

                                    >

                                        {this.state.hasOwnProperty("selectedParentId") === false ?
                                            <option value="">Look for a parent</option> : ""}
                                        {this.props.parents.filter(parent => Number(parent.teacherId) === Number(sessionStorage.getItem("credentials")))
                                            .map(e => (
                                                <option key={e.id} id="parents" value={e.id} >

                                                    {e.name}


                                                </option>
                                            ))}
                                    </Input>


                                    {this.state.hasOwnProperty("selectedParentId") === false ?
                                        ""
                                        :
                                        <Link to={"/parents/" + this.state.selectedParentId}><Button type="button" className="btn btn-info tl-btn" onClick={() => {



                                            sessionStorage.setItem("parentId", Number(this.state.selectedParentId))


                                        }}>Go to this Parent</Button></Link>
                                    }
                                    {/* <Link to={"/parents/" + this.state.selectedParentId}><Button type="button" className="btn btn-info tl-btn" onClick={() => 
                                    {   
                                        if (this.state.hasOwnProperty("selectedParentId") === false) {
                                        alert("Please Select a Parent")
                                    }
                                     else if (this.state.hasOwnProperty("selectedParentId") === true) {

                                        sessionStorage.setItem("parentId", Number(this.state.selectedParentId))
                                    }

                                    }}>Go to this Parent</Button></Link>


                                    <Link to={"/parents/" + this.state.selectedParentId}><Button type="button" className="btn btn-info tl-btn" onClick={() => 
                                    {   
                                        if (this.state.hasOwnProperty("selectedParentId") === false) {
                                        alert("Please Select a Parent")
                                    }
                                     else if (this.state.hasOwnProperty("selectedParentId") === true) {

                                        sessionStorage.setItem("parentId", Number(this.state.selectedParentId))
                                    }

                                    }}>Go to this Parent</Button></Link> */}
                                </div>
                            }

                            <span className="divide"></span>
                            <div className="search-section">
                                <button type="button"
                                    onClick={() => this.props.history.push("/students/new")}
                                    className="btn btn-success tl-btn">
                                    Add New Student/Parent
                    </button>
                            </div>
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

                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(TeacherHome)