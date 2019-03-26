import React, { Component } from "react"
import { Link } from "react-router-dom"
import {withRouter} from "react-router"
import eightNote from "../../images/8thnote.png"
import "bootstrap/dist/css/bootstrap.min.css"
class Nav extends Component {
  logout = () => {
    sessionStorage.clear("credentials")
    this.props.history.push(`/`)
    this.props.setAuth()
  }

  render() {
    return (
      <nav className="navbar fixed-top  flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {Number(sessionStorage.getItem("userType")) === 1 ? 
          <li className="nav-item">
            <Link className="nav-link" to="/paymentsummary">
              Payment Summary
            </Link>
          </li> : ""
          
        }
          {/* <li className="nav-item">
             

            <Link className="nav-link" to="/TeacherHome">
              Home
            </Link>
            
          </li> */}
        </ul>
        
        <h3 className="nav-link">Lesson Link ♪</h3>
        {/* <img src={eightNote} widht="20" height="20"></img> */}

        <button
          type="button"
          className="btn btn-outline-info"
          onClick={this.logout}>
          Logout
        </button>
      </nav>
    )
  }
}

export default withRouter(Nav)
