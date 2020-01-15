import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Input } from 'reactstrap';
import StudentAndParentManager from "../../modules/StudentAndParentManager";



class ParentDetail extends Component {
    // state = {
    //     student : []
    // }
  


    state = {
        parent: {},
        teacher: {}
    }



    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getOneParent(sessionStorage.getItem("credentials")).then(parent => {
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


    };
    render() {

        sessionStorage.removeItem("studentId")
        let parentId = sessionStorage.getItem("parentId")

        let thisParent = this.props.parents.find(parent => parseInt(parent.id) === parseInt(parentId)) || {}









        return (
            <React.Fragment>
                <div id="studentInfo">
                    <h1>{thisParent.name}</h1>

                    <h2>Your teacher's email :</h2>
                    <h4>{this.state.teacher.emailAddress} </h4>
                    <h2>Your teacher's Phone Number:</h2>
                    <a href={'tel:' + this.state.teacher.phoneNumber} className="phone">{this.state.teacher.phoneNumber}</a>
                    

                    
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
                    <div id="divider"></div>
                    <button type="button"
                        onClick={() => this.props.history.push(`/Students/${thisParent.id}/payments`)}
                        className="btn btn-success">
                        View Parent Payments
                    </button>
                </div>


            </React.Fragment>
        )
    }

}

export default ParentDetail