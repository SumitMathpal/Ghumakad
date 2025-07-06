const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {
  signUpRender,
  signUpPost,
  loginRender,
  loginPost,
  logOut,
} = require("../controllers/user");

// signup render
router.get("/signup", signUpRender);

// Signup Post
router.post("/signup", wrapAsync(signUpPost));

//login Render
router.get("/login", loginRender);

// loginPost
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginPost
);

// logoOut
router.get("/logout", logOut);
module.exports = router;
