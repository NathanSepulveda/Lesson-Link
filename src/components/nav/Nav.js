import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./nav.css";
import eightNote from "../../images/8thnote.png";
import "bootstrap/dist/css/bootstrap.min.css";
let style = {
  color: "aliceblue",
  margin: "5px"
};
class Nav extends Component {
  logout = () => {
    sessionStorage.clear("credentials");
    this.props.history.push(`/`);
    this.props.setAuth();
  };

  render() {
    return (
      <nav className="navbar fixed-top  flex-md-nowrap p-1 shadow">
        <ul className="nav nav-pills ">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Lesson Link ♪
            </Link>
          </li>
          {Number(sessionStorage.getItem("userType")) === 1 ? (
            <li className="nav-item">
              <Link className="nav-link" to="/paymentsummary">
                Payment Summary
              </Link>
            </li>
          ) : (
            ""
          )}
          {Number(sessionStorage.getItem("userType")) === 1 ? (
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
