import React, { Component } from 'react'
import "./TeacherHome.css"
import { Link } from "react-router-dom"



class TeacherHome extends Component {
    render() {

        let name = this.props.teacherName.name || ""
        let firstName = name.split(" ")[0] || ""
       
        console.log(this.props.teacherName)




        return (
            <React.Fragment>
                <h1>Welcome {firstName}!</h1>
                Students
                <select
                    defaultValue=""
                    name="studentList"
                    id="studentList"
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

                                e.name


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

export default TeacherHome