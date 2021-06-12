import React, { Component, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, registerUser } from "../actions/authActions";
import { getAllUsers, deleteUser } from "../actions/dashboardActions";
import TableScrollbar from 'react-table-scrollbar';

class AdminDashboard extends Component {

  constructor(){
    super();
    this.state = {
      tableData:[{_id: 'placeholder', name: 'place', role: 'PL', email: 'pl'}],
      errors: {}
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  deleteClick = id => {
    console.log(this.props);
    const input = {
      emailDelete:id,
      email:this.props.auth.user.email,
      auth: this.props.auth.isAuthenticated
    };
    this.props.deleteUser(input, this.props.history);
  }


    renderTableData() {
      return this.state.tableData.map((student, index) => {
        const { _id, name, role, email } = student //destructuring
        return (
          <tr key={_id}>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{role}</td>
            <td>{email}</td>
            <td className='operation'>
              <button className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                      onClick={() => this.deleteClick(email)}>
                      Delete</button>
              </td>
              <td className='operation'>
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                        onClick={() => this.updateCLick(_id)}>
                        Update</button>
              </td>
          </tr>
        )
      })
    }

  onGetAllUsersClick = e => {
    console.log(this.props.auth.isAuthenticated);
    const params = {
      email: this.props.auth.user.email,
      auth: this.props.auth.isAuthenticated
    }
    e.preventDefault();
    this.props.getAllUsers(params, this.props.history)
    .then(data => {

      this.setState({
        tableData: data.data
      });
      this.props.history.push("/admin-dashboard");
    })
  };

  oncreateClick = e => {
    e.preventDefault();
    this.props.history.push("/register")

  }

  renderTableHeader() {
        let headerElement = ['id',, 'name', 'role', 'email','delete', 'update']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
     }




 render() {
   console.log(this.props);
   const { user } = this.props.auth;
   return (
     <div style={{ height: "100vh" }} className="container valign-wrapper">
       <div className="row">
         <div className="col s12 center-align">
           <h4>
             <b>Hi,</b> {user.role}.
             <p className="flow-text grey-text text-darken-1">
               You are logged in. Welcome to {" "}
               <span style={{ fontFamily: "monospace" }}>CROWN SHIPS.</span>
             </p>
           </h4>

           <div className="col s12 center-align">
           <div className="scrollbar scrollbar-primary">
       <div className="force-overflow">
              <table id='students'>
               <thead>
                 <tr>{this.renderTableHeader()}</tr>
               </thead>
               <tbody>
                   {this.renderTableData()}
               </tbody>
              </table>
              </div>
            </div>
          </div>

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
           <span> </span>
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
             refresh
           </button>
           <span> </span>
           <button
             style={{
               width: "150px",
               borderRadius: "3px",
               letterSpacing: "1.5px",
               marginTop: "1rem"
             }}
             onClick={this.oncreateClick}
             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
           >
             create
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
  { logoutUser, getAllUsers, deleteUser, registerUser }
)(withRouter(AdminDashboard));
