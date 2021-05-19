import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, updateUser } from "../actions/authActions";

class BasicDashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onUpdatePasswordClick = e => {
    e.preventDefault();
    this.props.history.push('/UpdatePassword');
  };

  onUpdateNameClick = e => {
    e.preventDefault();
    this.props.history.push('/UpdateName');
  };

  // onUpdateEmailClick = e => {
  //   e.preventDefault();
  //   this.props.history.push('/UpdateEmail');
  // };

  render() {
    console.log(this.props.history);
    const { user } = this.props.auth;
    return (
      <div style={{ height: "90vh" }} className="container valign-wrapper">
        <div className="row">
        <p>
        </p>
        <p>
        </p>
        <div className="col s12 center-align">
          <h4>
            <b>Hi,</b> {user.name}.
            <p className="flow-text grey-text text-darken-1">
              You are logged in. Welcome to {" "}
              <span style={{ fontFamily: "monospace" }}>CROWN SHIPS.</span>
            </p>
          </h4>
        </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Name:</b> {user.name}
            </h4>
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Email:</b> {user.email}
            </h4>
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Role:</b> {user.role}
            </h4>
          </div>
          <div className="col s12 center-align">
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onUpdateNameClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Update Name
            </button>
            <span> </span>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onUpdatePasswordClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Update Password
            </button>
            <p></p>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
BasicDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(BasicDashboard));
