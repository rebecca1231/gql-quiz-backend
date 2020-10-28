const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;


module.exports = (context) => {
  //context = {... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer Token
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid Token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Authorization header must be provided");
};
