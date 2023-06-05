const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {

  let payload = {
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
