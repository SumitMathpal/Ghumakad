
 if(process.env.NODE_ENV != "production"){require('dotenv').config();}
const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require('connect-mongo');
const Listing = require("./models/model.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const wrapAsync = require("./utiles/wrapAsync.js");
const listingRoute  = require("./routes/listing.js")
const reviewsRoute = require("./routes/reviews");
const userRoute = require("./routes/user.js");
const flash = require("connect-flash");
const passport= require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Controllers---

const listingControllers = require("./controllers/listings.js");


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));




// const MONGO_URL = "mongodb://127.0.0.1:27017/GhumaKad";
const dbUrl = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbUrl);
}
main().then((res) => {
    console.log("connected to DB");}).catch((err) => {console.log(err);
  });

  app.get("/",(req,res)=>{
    res.send("page not found");
  });
// SESSION
const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
  secret:process.env.SECRET,},
touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("ERROR IN MONGO SESSIONN STORE ",err);
});
const sessionOptions ={

  store,
  secret: process.env.SECRET,
  resave : false,
  saveUninitialized: true,
  cookie :{
    expires: Date.now() + 7 *24 * 60 *60*1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  },
};


app.use(session(sessionOptions));
app.use(flash());
 

//Authantication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // store user info into session.
passport.deserializeUser(User.deserializeUser()); // release user info from session.


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  return next()
});



  
// Route use 
  app.use("/listings",listingRoute );
  app.use("/listings/:id/reviews", reviewsRoute);
  app.use("/", userRoute);

  // INDEX ROUTE
app.get("/home",   wrapAsync( listingControllers.index));
 
 


  // CONTACT ROUTE
app.get("/contact",(req,res)=>{
  res.render("./listings/contact.ejs");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body.contact;
  console.log("Contact Form Submission:", name, email, message);
  res.render("./listings/thnk.ejs", { name });
});

// Privacy route 
app.get("/privacy",(req,res)=>{
  res.render("./listings/privacy.ejs");
})

// TERMS ROUTE 

app.get("/terms",(req,res)=>{
  res.render("./listings/terms.ejs");
})
 



// app.all("*",(req,res,next)=>{
//   return next(new ExpressError(404,"page not found"));  //ERROR- server crash
// });

app.use((err,req,res,next)=>{
  let {status=500,message="show went wrong!"} = err;
  res.status(status).render("error.ejs",{message});

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Connection successfully started on port", port);
});
