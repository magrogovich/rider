const { requiresAuth } = require("express-openid-connect");
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Ride = require("../models/ride");

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

router.get("/", requiresAuth(), (req, res) => {
  res.render("create-ride", {
    title: "create-ride",
    governorates: tunisiaGovernorates,
  });
});

router.post("/", requiresAuth(), async (req, res) => {
  userDb = await User.findOne({ email: req.oidc.user.email });
  NewRide = new Ride({
    userId: userDb.sub,
    sourceAddress: req.body.sourceAddress,
    destinationAddress: req.body.destinationAddress,
    rideDate: req.body.rideDate,
    rideHour: req.body.rideHour,
    seatsLeft: req.body.seatsLeft,
  });
  NewRide.save().then(res.redirect("/"));
});

module.exports = router;
