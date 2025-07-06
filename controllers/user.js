const User = require("../models/user");

module.exports.signUpRender =  (req, res) => {
  res.render("users/signup.ejs");
}


module.exports.signUpPost = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const newMember = await User.register(newUser, password);
      console.log(newMember);

      req.login(newMember, (err) => {
        // Automatically login when new register.
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome, " + username + "!");
        res.redirect("/home");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


  module.exports.loginRender=(req, res) => {
  res.render("users/login.ejs");
}

module.exports.loginPost = (req, res) => {
    req.flash("success", "Welcome to Ghumakd!");
    const redirectUrl = res.locals.redirectUrl || "/home";
    res.redirect(redirectUrl);
  }

  module.exports.logOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "You logged Out.");
    res.redirect("/home");
  });
}