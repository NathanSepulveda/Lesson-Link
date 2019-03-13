import React, { Component } from 'react'
import "./TeacherHome.css"
import { Link } from "react-router-dom"
import {withRouter} from "react-router"



class TeacherHome extends Component {
    state = {}
    
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
        sessionStorage.removeItem("studentId")



        let name = this.props.teacherName.name || ""
        let firstName = name.split(" ")[0] || ""
       
        // console.log(this.props.teacherName)




        return (
            
            <React.Fragment>
                <h1>Welcome {firstName}!</h1>
                Students
                <select
                    defaultValue=""
                    name="studentList"
                    id="selectedStudentId"
                    onChange={this.handleFieldChange}

                >
                    <option value="">Look for a student</option>
                    {this.props.students.map(e => (
                        <option key={e.id} id="students" value={e.id} >
                            {e.name}
                            
                        </option>
                    ))}
                </select>
                <br></br>
                
                <Link to={"/students/" + this.state.selectedStudentId}><button type="button" onClick={() => {
                    sessionStorage.setItem("studentId", Number(this.state.selectedStudentId))
                }}>Go to this student</button></Link>
                
                <br></br>
                Parents
                <select
                    defaultValue=""
                    name="parentList"
                    id="parentList"
                    onChange={this.handleFieldChange

                    }

                >
                    <option value="">Look for a Parent</option>
                    {this.props.parents.map(e => (
                        <option key={e.id} id="parents" value={e.id} >

                                {e.name}


                        </option>
                    ))}
                </select>
                <br></br>
                <span className="divide"></span>
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