import React, { Component } from 'react'
import "./TeacherHome.css"
import { Link } from "react-router-dom"
import {withRouter} from "react-router"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';


class TeacherHome extends Component {
    state = {
        parents : this.props.parents,

    }
    
    handleFieldChange = evt => {
        
        // let selectedStudentId = Number(document.querySelector("#selectedStudentId").value)
        // console.log(selectedStudentId)
        
        const stateToChange = {};
        stateToChange[evt.target.id] = Number(evt.target.value);
        // stateToChange.selectedStudentId = selectedStudentId 
        
        this.setState(stateToChange);
        
    };
    
    // componentDidMount() {
    //     let newState = {}
    //     let makeState = () => {
    //         newState.parents = this.props.parents
    //         this.setState
    //     }


    // }
    
    
    render() {
        sessionStorage.removeItem("studentId")
        sessionStorage.removeItem("parentId")
        sessionStorage.removeItem("accountId")



        let name = this.props.teacherName.name || ""
        let firstName = name.split(" ")[0] || ""
       
        // console.log(this.props.teacherName)




        return (
            
            <React.Fragment>
                <h1>Welcome {firstName}!</h1>
                Students
                <Input
                    type="select"
                    defaultValue=""
                    name="studentList"
                    id="selectedStudentId"
                    onChange={this.handleFieldChange}

                >
                    <option value="">Look for a student</option>
                    {   this.props.students.filter(student => Number(student.parentId) === 0 && Number(student.teacherId) === Number(sessionStorage.getItem("credentials")))  
                        .map(e => (
                        <option key={e.id} id="students" value={e.id} >
                            {e.name}
                            
                        </option>
                    ))}
                </Input>
                <br></br>
                
                <Link to={"/students/" + this.state.selectedStudentId}><Button type="button" onClick={() => {
                    sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                }}>Go to this student</Button></Link>
                
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
                    {   this.props.parents.filter(parent => Number(parent.teacherId) === Number(sessionStorage.getItem("credentials")))
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
                <span className="divide"></span>
                <br></br>
                <button type="button"
                    onClick={() => this.props.history.push("/students/new")}
                    className="btn btn-success">
                    Add New Student
                    </button>

            </React.Fragment>
        )
    }
}

export default withRouter(TeacherHome)