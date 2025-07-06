
 const Listing = require("../models/model")

module.exports.index = async (req, res) => {
let allList =  await Listing.find({});

  res.render("./listings/index.ejs", {allList});
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.render("listings/show", { listing });
}

module.exports.createListings = async (req, res) => {
  let url=req.file.path;
  let filename = req.file.name;
  console.log(`${url} and ${filename}`);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/home");
  };

  module.exports.editRoute = async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      if (!listing) {
        req.flash("error", "Cannot edit. Listing not found!");
        return res.redirect("/home"); 
      }

      let originalUrl=listing.image.url;
      originalUrl.replace("/upload","/upload/w_250/blure:300");
      res.render("./listings/edit.ejs", { listing  , originalUrl});
    }

    module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
     let url=req.file.path;
  let filename = req.file.name;
listing.image = {url,filename};
await listing.save();
}
    req.flash("success", "Listing Updated");
    res.redirect(`/home`);
  }

  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/home");
  }