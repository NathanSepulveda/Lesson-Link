import React, { Component } from "react";
// import "./StudentForm.css"
import {Input } from 'reactstrap';
import StudentAndParentManager from "../../../modules/StudentAndParentManager"
import LessonDetaiInfo from "../../../modules/LessonDetaiInfo";




export default class StudentEditForm extends Component {
    // Set initial state
    state = {
        "userTypeId": 2,
        "teacherId": Number(sessionStorage.getItem("credentials")),
        "password": 0,
        "accountId": 0,
        "parentId": 0,
        "name" : "",
        "phoneNumber" : "",
        "emailAddress" : "",
        lessonTime: ""
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleCheckBox = evt => {
        console.log(evt.target.checked)
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.checked;
        this.setState(stateToChange);
    }
    
    EditStudent = evt => {
       

        
        
        evt.preventDefault();
        if (this.state.eventName === "") {
            window.alert("Please Enter Event Name");
        }
        else {
            const student = {
                name: this.state.name,
                accountId: this.state.accountId,
                phoneNumber: this.state.phoneNumber,
                id: this.state.id,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
                teacherId: this.state.teacherId,
                lessonDayId: this.state.lessonDayId,
                parentId: Number(this.state.parentId),

                instrumentId: this.state.instrumentId,
                locationId: this.state.locationId,
                lengthId: this.state.lengthId,
                userTypeId: this.state.userTypeId,
                lessonTime: this.state.lessonTime,
                active: this.state.active,
                lessonMaterialsIds: []

            };
            if (document.querySelector("#active").checked) {
                this.setState({active: true})
            } else {
                this.setState({active: false})
            }
            this.props.editStudent(student)
                .then(() => this.props.history.push(`/Students/${this.state.id}`));
        }
    };

    EditParents = evt => {
        evt.preventDefault();
        if (this.state.eventName === "") {
            window.alert("Please Enter Event Name");
        }
        else {
            const parent = {
                name: this.state.name,
                accountId: this.state.accountId,
                phoneNumber: this.state.phoneNumber,
                id: this.state.id,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
                teacherId: this.state.teacherId,
                lessonDayId: this.state.lessonDayId,
                parentId: this.state.parentId,
                lessonTime: this.state.lessonTime,
                instrumentId: this.state.instrumentId,
                locationId: this.state.locationId,
                lengthId: this.state.lengthId,
                userTypeId: this.state.userTypeId,

                active: true,
                lessonMaterialsIds: []

            };
            if (Number(parent.parentId) !== 0) {
                parent.parentId = 0
            }
            this.props.editParent(parent)
                .then(() => this.props.history.push(`/parents/${this.state.id}`));
        }
    };

    hideInfo = () => {
        document.querySelector("#contactInfo").classList.toggle("hidden")
        document.querySelector("#parents").classList.toggle("hidden")

        const stateToChange = {}
        stateToChange.emailAddress = 0
        stateToChange.phoneNumber = 0
        stateToChange.password = 0
        stateToChange.parentId = document.querySelector("#parents").key

        this.setState(stateToChange)


    }

    componentDidMount() {
        StudentAndParentManager.getStudent(Number(this.props.match.params.studentId))
            .then(student => {
                if (student.active) {
                    document.querySelector("#active").checked = true
                }
                this.setState({
                    name: student.name,
                    userTypeId: student.userTypeId,
                    id: student.id,
                    parentId: student.parentId,
                    phoneNumber: student.phoneNumber,
                    password: student.password,
                    accountId: student.accountId,
                    emailAddress: student.emailAddress,
                    instrumentId: Number(student.instrumentId),
                    locationId: Number(student.locationId),
                    lengthId: Number(student.lengthId),
                    lessonTime: student.lessonTime,
                    lessonDayId: student.lessonDayId,
                    active: student.active


                })

            })
    }

    render() {
        

        return (
            <React.Fragment>
                <div className="page-component-wrapper row d-flex justify-content-center">
                    <div className="page-component teacherhome col-md-6">
                        <label htmlFor="active">Active Student?</label> <br></br>
                        <input type="checkbox"
                            name="completed"
                            onClick={this.handleCheckBox}
                            

                            id="active" />
                        <form className="animalForm">
                            <div className="form-group">
                                <label htmlFor="eventName">Student Name</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="name"
                                    placeholder="First and last"
                                    value={this.state.name}
                                />
                            </div>
                            {Number(this.state.parentId) === 0 ?

                                <div id="contactInfo">

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            id="phoneNumber"
                                            value={this.state.phoneNumber}
                                            placeholder="xxx-xxx-xxxx"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="emailAddress">Email Address</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            id="emailAddress"
                                            placeholder=""
                                            value={this.state.emailAddress}
                                        />
                                    </div>
                                </div> : ""
                            }
                            <div id="parents" className="hidden">
                                Parents <br></br>
                                <Input
                                    // defaultValue="Pick a Parent"
                                    type="select"
                                    name="parentList"
                                    id="parentId"
                                    onChange={this.handleFieldChange}



                                >
                                    <option value="">Look for a Parent</option>
                                    {this.props.parents.map(e => (
                                        <option key={e.accountId} id="parentId" value={e.id} >

                                            {e.name}


                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lessonTime">Typical Lesson Time</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="lessonTime"
                                    value={this.state.lessonTime}
                                    placeholder="5:30 pm"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="instrument">Instrument</label>
                                <br></br>

                                <Input
                                    // defaultValue=""
                                    type="select"
                                    name="studentList"
                                    id="instrumentId"
                                    value={this.state.instrumentId}
                                    onChange={this.handleFieldChange}

                                >
                                    <option value=""></option>
                                    {LessonDetaiInfo.instruments.map(e => (
                                        <option key={e.id} id="instruments" value={e.id}>
                                            {e.name}
                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Lesson Location</label>
                                <br></br>
                                <Input
                                    type="select"
                                    name="locationList"
                                    id="locationId"
                                    onChange={this.handleFieldChange}
                                    value={this.state.locationId}

                                >
                                    <option value=""></option>
                                    {LessonDetaiInfo.locations.map(e => (
                                        <option key={e.id} id="locations" value={e.id}>
                                            {e.location}
                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lengths">Lesson Lengths</label>
                                <br></br>
                                <Input
                                    // defaultValue=""
                                    type="select"
                                    name="length"
                                    id="lengthId"
                                    value={this.state.lengthId}
                                    onChange={this.handleFieldChange}

                                >
                                    <option value=""></option>
                                    {LessonDetaiInfo.lengths.map(e => (
                                        <option key={e.id} id="lengths" value={e.id}>
                                            {e.length}
                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="days">Lesson Days</label>
                                <br></br>
                                <Input
                                    // defaultValue=""
                                    type="select"
                                    name="lessonDay"
                                    id="lessonDayId"
                                    value={this.state.lessonDayId}
                                    onChange={this.handleFieldChange}

                                >
                                    <option value=""></option>
                                    {LessonDetaiInfo.lessonDays.map(e => (
                                        <option key={Number(e.id)} id="days" value={Number(e.id)}>
                                            {e.day}
                                        </option>
                                    ))}
                                </Input>
                            </div>

                            {this.state.userTypeId === 2
                                ?
                                <button
                                    type="submit"
                                    onClick={this.EditStudent}
                                    className="btn btn-primary">
                                    Edit Student
                    </button> :

                                <button
                                    type="submit"
                                    onClick={this.EditParents}
                                    className="btn btn-primary">
                                    Edit Parent
</button>

                            }
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}