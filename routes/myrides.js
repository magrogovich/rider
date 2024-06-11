const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const router = express.Router();
const User = require("../models/user");
const Ride = require("../models/ride");

router.get("/", requiresAuth(), async (req, res) => {
  const dbUser = await User.findOne({ email: req.oidc.user.email });
  Ride.find({ userId: dbUser.sub }).then((data) => {
    console.log(data);
    res.render("myrides", {
      title: "My Rides",
      user: req.oidc.user,
      bio: dbUser.bio,
      data: data,
    });
  });
});

module.exports = router;
