import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/dashboardActions";
import classnames from "classnames";

class UpdateEmail extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      id: '',
      role: '',
      errors: {}
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  // If not logged in and user navigates to Login page, should redirect them to dashboard
  if (!this.props.auth.isAuthenticated) {
    this.props.history.push("/login");
  }
}

changeEmail(event){
  this.setState({
    email:event.target.value
  });
}

onSubmit(event, id) {
  event.preventDefault();

  const auth =  {
    email :this.state.email,
    id: this.state.id,
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
              <b>Update</b> Email.
            </h4>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <input
                type = 'text'
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

UpdateEmail.propTypes = {
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
)(UpdateEmail);
