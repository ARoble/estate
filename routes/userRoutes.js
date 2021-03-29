const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authControllers");

router
  .route("/login")
  .get(authController.checkNotAuthenticated, authController.login)
  .post(authController.loginUser);

router
  .route("/signup")
  .get(authController.checkNotAuthenticated, authController.signup)
  .post(authController.signupUser);

router.route("/logout").get(authController.logout);
module.exports = router;
