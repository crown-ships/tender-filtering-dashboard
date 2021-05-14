import {
 UPDATE_USER,
 DELETE_USER,
 GET_USER ,
 GET_ALL_USERS
} from "../actions/types";

const isEmpty = require("is-empty");
const initialState = {};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
