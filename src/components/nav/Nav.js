import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./nav.css";

import "bootstrap/dist/css/bootstrap.min.css";




class Nav extends Component {
  logout = () => {
    sessionStorage.clear("credentials");
    this.props.history.push(`/`);
    this.props.setAuth();
  };

  render() {
    let mobileConditions = true
      if (Number(sessionStorage.getItem("userType")) !== 1) {
        mobileConditions = false
      }
      if (window.matchMedia("(max-width: 414px)").matches) {
        mobileConditions = false
      }
    
    return (
      <nav className="navbar fixed-top  flex-md-nowrap p-1 shadow">
        <ul className="nav nav-pills ">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Lesson Link ♪
            </Link>
          </li>
          {mobileConditions ? (
            <li className="nav-item">
              <Link className="nav-link" to="/paymentsummary">
                Payment Summary
              </Link>
            </li>
          ) : (
            ""
          )}
          {mobileConditions ? (
            <li className="nav-item">
              <Link className="nav-link" to="/mileage">
                Mileage
              </Link>
            </li>
          ) : (
            ""
          )}

          <li className="nav-item" onClick={this.logout}>
            <Link className="nav-link" to="/">
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
