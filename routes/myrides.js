const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const router = express.Router();
const User = require("../models/user");
const Ride = require("../models/ride");
const { renderFile } = require("ejs");

const tunisiaGovernorates = [
  "Ariana",
  "Beja",
  "Ben Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
];

router.get("/:id", requiresAuth(), (req, res) => {
  Ride.findById(req.params.id).then((data) => {
    res.render("edit-ride", {
      title: "Edit Ride",
      governorates: tunisiaGovernorates,
      data: data,
    });
  });
});

router.post("/:id", requiresAuth(), async (req, res) => {
  userDb = await User.findOne({ email: req.oidc.user.email });
  NewRide = {
    userId: userDb.sub,
    sourceAddress: req.body.sourceAddress,
    destinationAddress: req.body.destinationAddress,
    rideDate: req.body.rideDate,
    rideHour: req.body.rideHour,
    seatsLeft: req.body.seatsLeft,
  };
  // NewRide.save().then(res.redirect("/"));
  console.log(NewRide);
  console.log(req.params.id);
  Ride.findByIdAndUpdate(req.params.id, NewRide)
    .then(() => {
      res.redirect("/myrides");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", requiresAuth(), async (req, res) => {
  const dbUser = await User.findOne({ email: req.oidc.user.email });
  Ride.find({ userId: dbUser.sub }).then((data) => {
    res.render("myrides", {
      title: "My Rides",
      user: req.oidc.user,
      bio: dbUser.bio,
      data: data,
    });
  });
});

module.exports = router;
