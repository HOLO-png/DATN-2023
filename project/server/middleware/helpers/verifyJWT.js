const jwt = require("jsonwebtoken");
const { JWT_EMAIL_VERIFICATION_KEY } =
  process.env;

module.exports = function verifyJWT(token) {
  try {
    return { payload: jwt.verify(token, JWT_EMAIL_VERIFICATION_KEY), expired: false };
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return { payload: jwt.decode(token), expired: true };
    }
    throw error;
  }
}