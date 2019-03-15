import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"

export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    name: ""
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
      password: this.state.password
    }
    if (this.state.name && this.state.password) {
      UserManager.searchname(this.state.name).then(users => {
        if (users.length) {
          alert(`name ${this.state.name} already exits!`)
        } else {
          UserManager.addUser(newUser).then(user => {
            sessionStorage.setItem("credentials", parseInt(user.id))
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

  render() {
    return (
      <React.Fragment>
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
          <button type="submit" onClick={this.handleLogin}>
            Sign in
        </button>
          <button type="submit" onClick={this.handleRegister}>
            Register
        </button>
        </form>
        <span></span>
        

      </React.Fragment>
    )
  }
}
