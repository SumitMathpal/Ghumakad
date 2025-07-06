const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/model.js");
const wrapAsync = require("../utiles/wrapAsync.js");
const { reviewSchema } = require("../schema.js"); // Server error hadling failed
const { isLoggedIn } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");

// Review- route
router.post("/", isLoggedIn, wrapAsync(createReview));

// Review Delete Route

router.delete("/:reviewId", wrapAsync(deleteReview));
module.exports = router;
