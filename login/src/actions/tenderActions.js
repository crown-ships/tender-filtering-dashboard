import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const registerTender = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("http://localhost:4000/api/signupTender", userData)
    .then(res => {
      console.log(res.data);
    }) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const searchTenders = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("http://localhost:4000/api/searchTenders", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

export const getTenders = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("http://localhost:4000/api/getTenders", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};
