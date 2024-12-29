const jwt = require("jsonwebtoken");
const SECRET_KEY = "OurCapstonProject_SECRET_KEY";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "2d",
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
module.exports = { generateToken, verifyToken };
