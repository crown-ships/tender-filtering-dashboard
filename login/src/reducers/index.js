import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import dashboardReducer from "./errorReducer";

const rootReducer =  combineReducers({
  auth: authReducer,
  errors: errorReducer  //add reducer for functinos
});

export default rootReducer;
