const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("staff-member")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("supervisor")
 .extend("staff-member")
 .readAny("profile")

ac.grant("admin")
 .extend("staff-member")
 .extend("supervisor")
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
