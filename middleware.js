
const { listingSchema } = require("./schema.js");
const ExpressError = require('./utiles/ExpressError.js');
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login"); 
  }
 return next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// module.exports.isOwner = async (req, res, next) => {
  
//   let { id } = req.params;
//   let listing = await Listing.findById(id);
//   if (!listing.owner.equals(res.locals.currentUser._id)) {
//     req.flash("error", "You are not the owner of this listing!");
//     return res.redirect(`/home/${id}`); 
//   }
//   next();
// };

module.exports.validationListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg); s
  }
  next();
};
