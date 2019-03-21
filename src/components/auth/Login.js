import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"

// let makeid = () => {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (var i = 0; i < 5; i++)
//       text += possible.charAt(Math.floor(Math.random() * possible.length));

//   return text;
// }
export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    name: "",
    userTypeId: 1,
    phoneNumber: "",
    accountId: 0,
    emailAddress: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = e => {
    e.preventDefault()
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

    }
    if (this.state.name && this.state.password) {
      UserManager.searchUsername(this.state.name).then(users => {
        if (users.length) {
          alert(`name ${this.state.name} already exits!`)
        } else {
          UserManager.addUser(newUser).then(user => {
            sessionStorage.setItem("credentials", parseInt(user.id))
            sessionStorage.setItem("userType", 1)

            this.props.setAuth()
          })
        }
      })
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.state.name && this.state.password) {
      UserManager.searchUP(this.state.name, this.state.password).then(
        user => {
          if (!user.length) {
            alert("Wrong name or password!")
          } else {
            sessionStorage.setItem("credentials", parseInt(user[0].id))
            sessionStorage.setItem("userType", user[0].userTypeId)
            this.props.setAuth()
          }
        }
      )
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  hideInfo = () => {
    document.querySelector(".contactInfo").classList.toggle("hidden")
    document.querySelector("#signInButton").classList.toggle("hidden")

}

  render() {
    return (
      <React.Fragment>
        <h1>Welcome to Lesson Link</h1>
        <form className="loginForm">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputname">name</label>
          <input
            onChange={this.handleFieldChange}
            type="name"
            id="name"
            placeholder={` Something Cool`}
            required=""
            autoFocus=""
          />
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder={` Don't tell!`}
            required=""
          />
          <div className="form-group">
            <label htmlFor="register?">Are you registering for the first time?</label> <br></br>
            <input type="checkbox"
              name="register"

              onChange={this.hideInfo}

              id="registerStatus" />
          </div>
          <button type="submit" onClick={this.handleLogin} id="signInButton" >
            Sign in
        </button>
          <br></br>

          <div className="contactInfo hidden" >
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

          <button type="submit" onClick={this.handleRegister}>
            Register
        </button>

          </div>
        </form>
        <span></span>


      </React.Fragment>
    )
  }
}
