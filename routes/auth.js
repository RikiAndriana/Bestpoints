const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const AuthController = require("../controllers/Auth");

router.get("/register", AuthController.registerForm);
router.post("/register", wrapAsync(AuthController.register));

router.get("/login", AuthController.loginForm);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "error_msg",
      msg: "Invalid username or password",
    },
  }),
  AuthController.login
);
router.post("/logout", AuthController.logout);

module.exports = router;
