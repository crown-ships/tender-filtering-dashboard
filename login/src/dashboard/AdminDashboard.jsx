import React, { Component, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getAllUsers } from "../actions/dashboardActions";
//import { getUser, getAllUser, updateUser, deleteUser } from "../actions/dashboardActions";

class AdminDashboard extends Component {

  constructor(){
    super();
    this.state = {
      tableData: {},
      errors: {}
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/delete"); // push user to dashboard when they login
      }
  if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }

    renderTableData() {
      // this.state.tableData =  this.props.getAllUsers(this.props.history);
      //  console.log(this.props.getAllUsers(this.props.history));
          // return this.state.tableData.map((student, index) => {
          //    const { id, name, role, email } = student //destructuring
          //    return (
          //       <tr key={id}>
          //          <td>{id}</td>
          //          <td>{name}</td>
          //          <td>{role}</td>
          //          <td>{email}</td>
          //       </tr>
          //    )
          // })
       }
  onGetAllUsersClick = e => {
    e.preventDefault();
    this.state.tableData =  this.props.getAllUsers(this.props.history);
  };



  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
          <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
            <h4>
              <b>Hi,</b> {user.role}.
              <p className="flow-text grey-text text-darken-1">
                You are logged in. Welcome to {" "}
                <span style={{ fontFamily: "monospace" }}>CROWN SHIPS.</span>
              </p>
            </h4>
            <Link to="/delete" className="btn-flat waves-effect">
              Delete User
            </Link>
            <span> </span>

            <Link to="/delete" className="btn-flat waves-effect">
              Update User
            </Link>
            <p></p>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onGetAllUsersClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Get All
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
AdminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, getAllUsers }
)(withRouter(AdminDashboard));
