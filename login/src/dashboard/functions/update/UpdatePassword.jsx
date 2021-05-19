import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/dashboardActions";
import classnames from "classnames";

class UpdatePassword extends Component {
  constructor(){
    super();
    this.state = {
      password: '',
      password2: '',
      id: '',
      role: '',
      errors: {}
    };

    this.changePassword = this.changePassword.bind(this);
    this.changePassword2 = this.changePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  // If not logged in and user navigates to Login page, should redirect them to dashboard
  if (!this.props.auth.isAuthenticated) {
    this.props.history.push("/login");
  }
}

changePassword(event){
  this.setState({
    password:event.target.value
  });
}
changePassword2(event){
  this.setState({
    password2:event.target.value
  });
}

onSubmit(event, id) {
  event.preventDefault();

  const auth =  {
    password : this.state.password,
    password2 : this.state.password2,
    id: this.state.id,
    auth: this.props.auth.isAuthenticated,
    role: this.state.role
  }

    console.log(auth);

  this.props.updateUser(auth, this.props.history);
}

render() {
  const { errors } = this.state;
  const { user } = this.props.auth;
  this.state.id = user.id;
  this.state.role = user.role;
  return(
    <div>
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/basic-dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            User Details
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Update</b> Password.
            </h4>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <input
                type = 'text'
                placeholder='Password'
                onChange={this.changePassword}
                value={this.state.password}
                className={classnames("", {
                  invalid: errors.password || errors.passwordnotfound
                })}
              />
              <span className="red-text">
                {errors.password}
                {errors.passwordnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                type = 'text'
                placeholder='Confirm Password'
                onChange={this.changePassword2}
                value={this.state.password2}
                className={classnames("", {
                  invalid: errors.password2 || errors.password2notfound
                })}
              />
              <span className="red-text">
                {errors.password2}
                {errors.password2notfound}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Update
              </button>
            </div>
            </form>
        </div>
      </div>
    </div>
    </div>
  );
}
}

UpdatePassword.propTypes = {
updateUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
auth: state.auth,
errors: state.errors
});
export default connect(
mapStateToProps,
{ updateUser }
)(UpdatePassword);
