import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 UPDATE_USER,
 DELETE_USER,
 GET_USER ,
 GET_ERRORS,
 GET_ALL_USERS
} from "../actions/types";

export const updateUser = (userData, history) => dispatch => {

  axios
    .post("http://localhost:4000/api/user/"+userData.id, userData)
    .then(res => {
      console.log("updated");

      if(userData.role == "basic")
        history.push("/basic-dashboard")
      else if (userData.role == "admin")
        history.push("/admin-dashboard")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteUser = (userData, history) => dispatch => {
  axios
    .delete("http://localhost:4000/api/user/" + userData)
    .then(res => history.push("/admin-dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllUsers = (history) => dispatch => {
  //const ssdata ={};
  axios
    .get("http://localhost:4000/api/users")
    .then(res => {
      console.log(res.data);
      // history.push("/admin-dashboard"),
      //ssdata =  res.data;
    //  return ssdata;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

};
