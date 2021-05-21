
const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRole(data) {
  let errors = {};

  if(Validator.isEmpty(data.role)){
    errors.role = "Role field is required";
  }
  else if(!(Validator.equals(data.role,"staff-member")|| Validator.equals(data.role,"supervisor")||Validator.equals(data.role,"admin")||Validator.equals(data.role,"super-admin"))){
    errors.role = "Role is invalid.";
  }

  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
