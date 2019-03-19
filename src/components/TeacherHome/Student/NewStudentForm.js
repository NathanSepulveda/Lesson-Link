import React, { Component } from "react";
import "./StudentForm.css"
import StudentAndParentManager from "../../../modules/StudentAndParentManager";


let makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


export default class EventForm extends Component {
    // Set initial state
    state = {
        "userTypeId": 2,
        "teacherId": Number(sessionStorage.getItem("credentials")),
        "password": makeid(),
        "accountId": makeid(),
        "parentId": 0
    };


    handleFieldChange = evt => {

        let accountId = makeid()
        const stateToChange = {};

        stateToChange.accountId = accountId
        stateToChange[evt.target.id] = evt.target.value;
        let parentId = document.querySelector("#parentId").value
        sessionStorage.setItem("parentId", parentId)

        StudentAndParentManager.getOneParent(Number(sessionStorage.getItem("parentId"))).then(parent => {
            sessionStorage.setItem("accountId", parent.accountId)
            stateToChange.accountId = Number(sessionStorage.getItem("accountId"))
            this.setState(stateToChange)

        })
        
    };

    NewStudent = evt => {
        
        let accountId = makeid
        if (Number(sessionStorage.getItem("accountId")) !== null) {
            accountId = Number(sessionStorage.getItem("accountId"))
        }
        evt.preventDefault();
        if (this.state.eventName === "") {
            window.alert("Please Enter Event Name");
        }
        else {
            const student = {
                name: this.state.name,
                accountId: makeid(),
                phoneNumber: this.state.phoneNumber,
                accountId: accountId,
                emailAddress: this.state.emailAddress,
                password: makeid(),
                teacherId: this.state.teacherId,
                lessonDayId: Number(this.state.lessonDayId),
                parentId: Number(this.state.parentId),
                lessonTime: this.state.lessonTime,
                instrumentId: Number(this.state.instrumentId),
                locationId: Number(this.state.locationId),
                lengthId: Number(this.state.lengthId),
                userTypeId: Number(this.state.userTypeId),
                lessonTime: this.state.lessonTime


            };
            console.log(student)
            if (student.parentId === 0) {
                student.accountId = makeid()
            } else if 
                (student.parentId !== 0 ) {
                    student.accountId = sessionStorage.getItem("accountId")
                    student.password = null
                }
            
            console.log(student)
            this.props.addStudent(student)
                .then(() => this.props.history.push("/TeacherHome"));
        }
    };

    hideInfo = () => {
        document.querySelector("#contactInfo").classList.toggle("hidden")
        document.querySelector("#parents").classList.toggle("hidden")

        const stateToChange = {}
        stateToChange.emailAddress = 0
        stateToChange.phoneNumber = 0
        stateToChange.password = null
        stateToChange.password = 0
        stateToChange.parentId = document.querySelector("#parents").value
        this.setState(stateToChange)



    }


    render() {
        return (
            <React.Fragment>
                
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
                        />
                    </div>
                    <select
                        defaultValue=""
                        name="length"
                        id="userTypeId"
                        onChange={this.handleFieldChange}

                    >
                        <option value="Usertype">New Usertype</option>

                        <option id="userTypes" value="3">
                            Parent
                        </option>
                        <option id="userTypes" value="2">
                            Student
                        </option>

                    </select>
                    <div className="form-group">
                        <label htmlFor="parent?">Does this student have a parent?</label> <br></br>
                        <input type="checkbox"
                            name="completed"

                            onChange={this.hideInfo}

                            id="parentStatus" />
                    </div>
                    <div id="contactInfo">
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="phoneNumber"
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
                            />
                        </div>
                    </div>
                    <div id="parents" className="hidden">
                        Parents <br></br>
                        <select
                            defaultValue="Pick a Parent"
                            name="parentList"
                            id="parentId"
                            onChange={this.handleFieldChange}



                        >
                            <option value="">Look for a Parent</option>
                            {this.props.parents.filter(parent => Number(parent.teacherId) === Number(sessionStorage.getItem("credentials")))
                            .map(e => (
                                <option key={e.accountId} id="parentId" value={e.id} >

                                    {e.name}


                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lessonTime">Typical Lesson Time</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="lessonTime"
                            placeholder="5:30 pm"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instrument">Instrument</label>
                        <br></br>

                        <select
                            defaultValue=""
                            name="studentList"
                            id="instrumentId"
                            onChange={this.handleFieldChange}

                        >
                            <option value=""></option>
                            {this.props.instruments.map(e => (
                                <option key={e.id} id="instruments" value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Lesson Location</label>
                        <br></br>
                        <select
                            defaultValue=""
                            name="locationList"
                            id="locationId"
                            onChange={this.handleFieldChange}

                        >
                            <option value=""></option>
                            {this.props.locations.map(e => (
                                <option key={e.id} id="locations" value={e.id}>
                                    {e.location}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lengths">Lesson Lengths</label>
                        <br></br>
                        <select
                            defaultValue=""
                            name="length"
                            id="lengthId"
                            onChange={this.handleFieldChange}

                        >
                            <option value=""></option>
                            {this.props.lengths.map(e => (
                                <option key={e.id} id="lengths" value={e.id}>
                                    {e.length}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="days">Lesson Days</label>
                        <br></br>
                        <select
                            defaultValue=""
                            name="lessonDay"
                            id="lessonDayId"
                            onChange={this.handleFieldChange}

                        >
                            <option value=""></option>
                            {this.props.lessonDays.map(e => (
                                <option key={Number(e.id)} id="days" value={Number(e.id)}>
                                    {e.day}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        onClick={this.NewStudent}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}