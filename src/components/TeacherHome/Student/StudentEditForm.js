import React, { Component } from "react";
import "./StudentForm.css"
import StudentAndParentManager from "../../../modules/StudentAndParentManager"

let makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


export default class StudentEditForm extends Component {
    // Set initial state
    state = {
        "userTypeId": 2,
        "teacherId": Number(sessionStorage.getItem("credentials")),
        "password": 0 ,
        "accountId": 0,
        "parentId": 0
    };


    handleFieldChange = evt => {
        // let password = makeid()
        // let accountId = makeid()
        const stateToChange = {};
        // stateToChange.password = password
        // stateToChange.accountId = accountId
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

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
                lessonTime: this.state.lessonTime,
                instrumentId: this.state.instrumentId,
                locationId: this.state.locationId,
                lengthId: this.state.lengthId,
                userTypeId: this.state.userTypeId,
                lessonTime: this.state.lessonTime

            };
            this.props.editStudent(student)
                .then(() => this.props.history.push("/TeacherHome"));
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
            this.setState({
                name: student.name,
                id: student.id,
                phoneNumber: student.phoneNumber,
                password: student.password,
                accountId: student.accountId,
                emailAddress: student.emailAddress,
                instrumentId: Number(student.instrumentId),
                locationId: Number(student.locationId),
                lengthId: Number(student.lengthId),
                lessonTime: student.lessonTime,
                lessonDayId: student.lessonDayId
                

            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                {console.log(this.state)}
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
                    </div>
                    <div id="parents" className="hidden">
                        Parents <br></br>
                <select
                            // defaultValue="Pick a Parent"
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
                            value={this.state.lessonTime}
                            placeholder="5:30 pm"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instrument">Instrument</label>
                        <br></br>
                        
                        <select
                            // defaultValue=""
                            name="studentList"
                            id="instrumentId"
                            value={this.state.instrumentId}
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
                            
                            name="locationList"
                            id="locationId"
                            onChange={this.handleFieldChange}
                            value={this.state.locationId}

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
                            // defaultValue=""
                            name="length"
                            id="lengthId"
                            value={this.state.lengthId}
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
                            // defaultValue=""
                            name="lessonDay"
                            id="lessonDayId"
                            value={this.state.lessonDayId}
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
                        onClick={this.EditStudent}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}