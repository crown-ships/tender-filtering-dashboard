const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("staff-member")
 .readOwn("profile")
 .updateOwn("profile")
 .readAny("tender")
 .create("tender")

ac.grant("supervisor")
  .readAny("profile")
 .extend("staff-member")


ac.grant("admin")
 .extend("staff-member")
 .extend("supervisor")
 .readAny("profile")
 .updateAny("profile")
 .deleteAny("profile")
 .create("profile")

 ac.grant("super-admin")
  .extend("staff-member")
  .extend("admin")
  .extend("supervisor")
  .updateAny("profile")
  .deleteAny("profile")
  .create("profile")
return ac;
})();
