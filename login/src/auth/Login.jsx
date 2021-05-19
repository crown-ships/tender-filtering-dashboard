import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      errors: {}
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  // If logged in and user navigates to Login page, should redirect them to dashboard
  if (this.props.auth.isAuthenticated) {
    if (this.props.auth.user.role == "admin"){
      this.props.history.push("/admin-dashboard"); // push user to dashboard when they login
    }
    else if (this.props.auth.user.role == "staff-member") {
      this.props.history.push("/basic-dashboard");
    }
    else {
      this.props.history.push("/basic-dashboard")
    }
  }
}

  UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        if (nextProps.auth.user.role == "admin"){
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

  changeEmail(event){
    this.setState({
      email:event.target.value
    });
  }

  changePassword(event){
    this.setState({
      password:event.target.value
    });
  }

  onSubmit(event){
    event.preventDefault();

    const auth = {
      email:this.state.email,
      password:this.state.password
    };
    this.props.loginUser(auth);
    // axios.post('http://localhost:4000/api/login', auth)
    // .then(resp => console.log(resp.data));

    this.setState({
      email:'',
      password:''
    });
  }

  render() {
    const { errors } = this.state;

    return(
      <div>
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  type = 'email'
                  placeholder='Email'
                  onChange={this.changeEmail}
                  value={this.state.email}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  type = 'password'
                  placeholder='Password'
                  onChange={this.changePassword}
                  value={this.state.password}
                  className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
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
                  Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
