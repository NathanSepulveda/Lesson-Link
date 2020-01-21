import React, { Component } from "react"
import Login from "./Login"
import UserAccessLayer from "../UserAccessLayer"

class IsAuth extends Component {
  render() {
    console.log(this.props.isAuthenticated())
    return (
      <React.Fragment>
        {this.props.isAuthenticated() ? (
          <UserAccessLayer {...this.props} />
        ) : (
          <Login {...this.props} />
        )}
      </React.Fragment>
    )
  }
}

export default IsAuth
