const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/model.js");
const { isLoggedIn, validationListing } = require("../middleware.js");
const {
  renderNewForm,
  showListing,
  createListings,
  editRoute,
  updateListing,
  deleteListing,
} = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// NEW ROUTE
router.get("/new", isLoggedIn, renderNewForm);

// SHOW ROUTE
router.get("/:id", wrapAsync(showListing));

// CREATE ROUTE
router.post(
  "/",
  isLoggedIn,
  validationListing,
  upload.single("listing[image]"),
  wrapAsync(createListings)
);

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, wrapAsync(editRoute));

// UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  validationListing,
  upload.single("listing[image]"),
  wrapAsync(updateListing)
);

// DELETE ROUTE
router.delete("/:id", isLoggedIn, wrapAsync(deleteListing));

module.exports = router;
