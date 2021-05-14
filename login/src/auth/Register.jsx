import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      errors: {}
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePassword2 = this.changePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      // If logged in and user navigates to Register page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
  onSubmit(event){
    event.preventDefault();

    const registered = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2: this.state.password2
    };

    // axios.post('http://localhost:4000/signup', registered)
    // .then(resp => console.log(resp.data));
    this.props.registerUser(registered, this.props.history);

    this.setState({
      name:'',
      email:'',
      password:'',
      password2:''
    });

  }

  render() {
    const { errors } = this.state;
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    type = 'text'
                    onChange={this.changeName}
                    value={this.state.name}
                    className={classnames("", {
                    invalid: errors.name
                  })}
                  />
                  <label htmlFor="name">Name</label>
                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    type = 'text'
                    onChange={this.changeEmail}
                    value={this.state.email}
                    className={classnames("", {
                    invalid: errors.email
                  })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                  <input type = 'password'
                    onChange={this.changePassword}
                    value={this.state.password}
                    className={classnames("", {
                    invalid: errors.password
                  })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input type = 'password'
                    onChange={this.changePassword2}
                    value={this.state.password2}
                    className={classnames("", {
                    invalid: errors.password2
                  })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div  className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
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
