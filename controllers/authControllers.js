const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
exports.login = async (req, res) => {
  try {
    req.flash("success", "You are logged out");

    res.render("login");
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    res.render("signup");
  } catch (e) {
    console.log(e);
  }
};

exports.signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      fullName: req.body.fullname,
      email: req.body.email,
      phone: req.body.number,
      location: req.body.location,
      password: hashedPassword,
    });
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.checkNotAuthenticated = (req, res, next) => {
  console.log("okay lets see");
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    //if logged in
    return res.redirect("/");
  }
  next();
};

exports.checkAuthenticated = (req, res, next) => {
  console.log("okay lets see");
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    //if logged in
    req.flash("danger", "Please login to access this page");
    return res.redirect("/login");
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
