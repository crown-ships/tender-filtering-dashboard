import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
const Validator = require("validator");
const isEmpty = require("is-empty");

function validate(name, email, password, password2, role) {
  let errors = {};
  var letters = /^[A-Za-z " "]+$/;
  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

// Name checks
  if (Validator.isEmpty(name)) {
    errors.name = "Name field is required";
  }
  if(!name.match(letters)){
    errors.name = "Name can only contain alphabets."
  }
  if (!Validator.isLength(name, { min: 0, max: 50 })) {
      errors.name = "Name cannot exceed length of 50 characters.";
    }
// Email checks
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if(Validator.isEmpty(role)){
    errors.role = "Role field is required";
  }
  else if(!(Validator.equals(role,"staff-member")|| Validator.equals(role,"supervisor")||Validator.equals(role,"admin")||Validator.equals(role,"super-admin"))){
    errors.role = "Role is invalid.";
  }
// Password checks
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  else if (!Validator.isLength(password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }
if (Validator.isEmpty(password2)) {
    errors.password2 = "Confirm password field is required";
  }

if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }
// true means invalid, so our conditions got reversed
  return errors;
}


class Register extends Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      role: '',
      createdBy: '',
      touched: {
        name: false,
        email: false,
        password: false,
        password2:false,
        role:false
      },
      error: {}
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePassword2 = this.changePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }

  componentDidMount() {
      // If logged in and user navigates to Register page, should redirect them to dashboard
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push("/login");
      }
    }


  canBeSubmitted() {
    const errors = validate(this.state.name, this.state.email, this.state.password, this.state.password2, this.state.role);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (this.auth.user.role == "admin"){
        this.props.history.push("/admin-dashboard"); // push user to dashboard when they login
      }
      else if (nextProps.auth.user.role == "basic") {
        this.props.history.push("/basic-dashboard");
      }
      else{
        this.props.history.push("/basic-dashboard")
      }
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  changeName(event){
    this.setState({
      name:event.target.value
    });
  }

  changeEmail(event){
    this.setState({
      email:event.target.value
    });
  }
  changeRole(event){
    this.setState({
      role:event.target.value
    });
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

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };
  onSubmit(event){
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }

    const registered = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2: this.state.password2,
      role: this.state.role,
      userRole: this.props.auth.user.role,
      createdBy: this.props.auth.user.id,
      createdByName: this.props.auth.user.name,
      authentication: this.props.isAuthenticated
    };

    this.props.registerUser(registered, this.props.history)
    .then(this.props.history.push("/admin-dashboard"))
    this.setState({
      name:'',
      email:'',
      password:'',
      password2:'',
      role: ''
    });

  }

  render() {
    const errors = validate(this.state.name, this.state.email, this.state.password, this.state.password2, this.state.role);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    const { errors_b } = this.state;
    console.log(errors_b);

    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/admin-dashboard" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                dashboard
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    type = 'text'
                    onChange={this.changeName}
                    value={this.state.name}
                    className={shouldMarkError("name") ? "error" : ""}
                    onBlur={this.handleBlur("name")}
                  />
                  <label htmlFor="name">Name</label>
                  <span className="red-text">{shouldMarkError("name") ? errors.name:""}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    type = 'text'
                    onChange={this.changeEmail}
                    value={this.state.email}
                    className={shouldMarkError("email") ? "error" : ""}
                    onBlur={this.handleBlur("email")}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{shouldMarkError("email") ? errors.email:""}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    type = 'text'
                    onChange={this.changeRole}
                    value={this.state.role}
                    className={shouldMarkError("role") ? "error" : ""}
                    onBlur={this.handleBlur("role")}
                  />
                  <label htmlFor="role">Role</label>
                  <span className="red-text">{shouldMarkError("role") ? errors.role:""}</span>
                </div>
                <div className="input-field col s12">
                  <input type = 'password'
                    onChange={this.changePassword}
                    value={this.state.password}
                    className={shouldMarkError("password") ? "error" : ""}
                    onBlur={this.handleBlur("password")}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{shouldMarkError("password") ? errors.password:""}</span>
                </div>
                <div className="input-field col s12">
                  <input type = 'password'
                    onChange={this.changePassword2}
                    value={this.state.password2}
                    className={shouldMarkError("password2") ? "error" : ""}
                    onBlur={this.handleBlur("password2")}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{shouldMarkError("password2") ? errors.password2:""}</span>
                </div>
                <div  className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                  disabled={isDisabled}
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                    type='submit'
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                  >
                  Sign Up
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
