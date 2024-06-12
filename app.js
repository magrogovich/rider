const express = require("express");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const mongoose = require("mongoose");

// pages call
const home = require("./routes/home");
const profile = require("./routes/profile");
const createRide = require("./routes/create-ride");
const bio = require("./routes/bio");
const ride = require("./routes/ride");
const myrides = require("./routes/myrides");
const deleteRide = require("./routes/delete-ride");

const app = express();

// configuration
app.set("view engine", "ejs");
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

//  connect to db
mongoose
  .connect("mongodb://localhost:27017/ride")
  .then(() => {
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(`error: could not connect to the db error messg: ${err}`);
  });

// settings`
app.use(express.static("public"));
app.use(auth(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pages
app.use("/", home);
app.use("/profile", profile);
app.use("/create-ride", createRide);
app.use("/profile-bio", bio);
app.use("/ride", ride);
app.use("/myrides", myrides);
app.use("/edit", myrides);
app.use("/delete", deleteRide);
