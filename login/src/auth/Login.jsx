import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";


import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import DirectionsBoatOutlinedIcon from '@material-ui/icons/DirectionsBoatOutlined';



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
      this.props.history.push("/search");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/search");
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

    const paperStyle={padding :20,height:'70vh',width:300, margin:"50px auto"}
    const avatarStyle={backgroundColor:'#000000', padding:15, margin: "10px"}
    const btnstyle={margin:'8px 0', backgroundColor: '#Fc6969'}
    return(
      <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' >
                     <Avatar style={avatarStyle}><DirectionsBoatOutlinedIcon/></Avatar>
                </Grid>
                <Typography variant='h4' display='block'align="center">McM</Typography>
                <form noValidate onSubmit={this.onSubmit}>
                  <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={this.changeEmail}
                    value={this.state.email}
                  />
                  </div>
                  <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"

                    onChange={this.changePassword}
                    value={this.state.password}
                  />
                  </div>

                  <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Log in</Button>
                </form>
            </Paper>
        </Grid>
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
