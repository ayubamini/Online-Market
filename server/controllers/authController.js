const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const bcryptSalt = process.env.BCRYPT_SALT;
const JWTSecret = process.env.JWT_SECRET;

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email address" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Email or password is not matched" });
    }

    const token = JWT.sign({ userId: user._id }, JWTSecret);

    return res.status(201).json({
      message: "Authentication successful",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signUp = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    });

    var registeredUser = await user.save();
    res.status(201).json({
      data: {
        userId: registeredUser._id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        phoneNumber: registeredUser.phoneNumber
      },
      message: "User added successfully!",
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(409).json({
        error: true,
        code: 11000,
        message: "Duplicate key error: User already exists!",
      });
    } else {
      res.status(500).json({
        error: true,
        message: "An error occurred during registration.",
      });
    }
  }
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User does not exist");
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/resetPassword?token=${resetToken}&id=${user._id}`;
  // sendEmail(
  //   user.email,
  //   "Password Reset Request",
  //   { name: user.name, link: link },
  //   "./requestPasswordReset.js"
  // );
  return link;
};

const resetPassword = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, Number(bcryptSalt));
    const userId = req.body.id;
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });

    // Send Email 
    // sendEmail(
    //   user.email,
    //   "Password Reset Successfully",
    //   {
    //     name: user.firstName + " " + user.lastName,
    //   },
    //   "./resetPassword.jsx"
    // );
    res.status(201).json({ status: "Password Reset Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ status: "err", message: err });
  }
};

const auth = async (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ error: "Authentication failed try Again" });

    const decodedToken = JWT.verify(token, JWTSecret);

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed try Again" });
    }

    req.isRegistered = true;

    if (user.isStaff)
      req.isStaff = true;

    if (user.isAdmin)
      req.isAdmin = true;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Authentication failed try Again" });
  }
};

module.exports = {
  signIn,
  signUp,
  requestPasswordReset,
  resetPassword,
  auth
};
