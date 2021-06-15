import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Register from "./auth/Register";
import Login from "./auth/Login";
import PrivateRoute from "./privateRoute/PrivateRoute";
import AdminDashboard from "./dashboard/AdminDashboard";
import BasicDashboard from "./dashboard/BasicDashboard";
import Delete from "./dashboard/functions/Delete";
import UpdateEmail from "./dashboard/functions/update/UpdateEmail";
import UpdateName from "./dashboard/functions/update/UpdateName";
import UpdatePassword from "./dashboard/functions/update/UpdatePassword";
// Check for token to keep user logged in
import Search from "./components/Sections/Search/SearchPage";
import Employees from "./components/Sections/Employees/Employees";
import Profile from "./components/Sections/Profile/profile";
import Settings from "./components/Sections/Settings/SettingsPage";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (

      <Provider store = {store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/register" component={Register} />
              <PrivateRoute exact path="/search" component={Search} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute exact path="/employees" component={Employees} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/basic-dashboard" component={BasicDashboard} />
              <PrivateRoute exact path="/delete" component={Delete} />
              <PrivateRoute exact path="/UpdateName" component={UpdateName} />
              <PrivateRoute exact path="/UpdateEmail" component={UpdateEmail} />
              <PrivateRoute exact path="/UpdateName" component={UpdateName} />
              <PrivateRoute exact path="/UpdatePassword" component={UpdatePassword} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
