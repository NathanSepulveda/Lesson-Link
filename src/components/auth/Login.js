import React, { Component } from "react";
import "./login.css";
import UserManager from "../../modules/UserManager";
import { Button } from "reactstrap";



export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    name: "",
    userTypeId: 1,
    phoneNumber: "",
    accountId: 0,
    emailAddress: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleRegister = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      accountId: this.state.accountId,
      password: this.state.password,
      userTypeId: this.state.userTypeId,
      phoneNumber: this.state.phoneNumber,
      emailAddress: this.state.emailAddress,
      lessonDayId: 0,
      teacherId: 0,
      parentId: 0,
      lessonTime: 0,
      instrumentId: 0,
      locationId: 0,
      lengthId: 0,
      active: true,
      lessonMaterialsIds: []
    };
    if (this.state.name && this.state.password) {
      UserManager.searchUsername(this.state.name).then(users => {
        if (users.length) {
          alert(`name ${this.state.name} already exits!`);
        } else {
          UserManager.addUser(newUser).then(user => {
            sessionStorage.setItem("credentials", user.id);
            sessionStorage.setItem("userType", 1);

            this.props.setAuth();
          });
        }
      });
    } else {
      alert("Please Fill Out Form 😬!");
    }
  };

  handleLogin = e => {
    e.preventDefault();
    if (this.state.name && this.state.password) {
      UserManager.searchUP(this.state.name, this.state.password).then(user => {
        if (!user) {
          alert("Wrong name or password!");
        } else {
          sessionStorage.setItem("credentials", user.id);
          sessionStorage.setItem("userType", user.userTypeId);
          this.props.setAuth();
        }
      });
    } else {
      alert("Please Fill Out Form 😬!");
    }
  };

  hideInfo = () => {
    document.querySelector(".contactInfo").classList.toggle("hidden");
    document.querySelector("#signInButton").classList.toggle("hidden");
  };

  render() {
    return (
      <React.Fragment>
        <div id="LG" className="page-component-wrapper row d-flex justify-content-center logg">
          <div className="col-md-6 cont">
            <div id="banner">
          <h2>Welcome to Lesson Link!</h2>
          </div>

          <form className="loginForm">
            <div className=" form-group row">
              <label htmlFor="inputname">Name</label>
              <input
                onChange={this.handleFieldChange}
                type="Name"
                id="name"
                className="form-control log"
                // placeholder={` Something Cool`}
                required=""
                autoFocus=""
              />
              <label htmlFor="inputPassword" className="lab">
                Password
              </label>
              <input
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                className="form-control"
                // placeholder={` Don't tell!`}
                required=""
              />
              {/* <div className="form-group">
            <label htmlFor="register?">Are you registering for the first time?</label> <br></br>
            <input type="checkbox"
              name="register"

              onChange={this.hideInfo}

              id="registerStatus" />
          </div> */}
            </div>
            <div id="buttonCont">
            <Button
              type="submit"
              onClick={this.handleLogin}
              id="signInButton"
              size="small"
            >
              Sign in
            </Button>
            </div>
            <br></br>

            <div className="contactInfo hidden">
              <label htmlFor="inputEmail">Email</label>
              <input
                onChange={this.handleFieldChange}
                type="email"
                id="email"
                placeholder={` Don't tell!`}
                required=""
              />
              <label htmlFor="inputPhoneNumber">Phone Number</label>
              <input
                onChange={this.handleFieldChange}
                type="phoneNumber"
                id="phoneNumber"
                placeholder={` Don't tell!`}
                required=""
              />

              <Button type="submit" onClick={this.handleRegister}>
                Register
              </Button>
            </div>
          </form>
          <span></span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
