const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const router = express.Router();
const User = require("../models/user");
const Ride = require("../models/ride");

router.get("/:id", requiresAuth(), async (req, res) => {
  const dbUser = await User.findOne({ email: req.oidc.user.email });
  Ride.findById(req.params.id)
    .then(async (info) => {
      //   console.log(info);
      User.find({ sub: info.userId }).then((user) => {
        // console.log(user);
        let demoData = {
          id: info._id,
          nickname: user[0].nickname,
          picture: user[0].pic,
          bio: user[0].bio,
          sourceAddress: info.sourceAddress,
          destinationAddress: info.destinationAddress,
          rideDate: info.rideDate,
          rideHour: info.rideHour,
          seatsLeft: info.seatsLeft,
        };
        res.render("ride", {
          title: "Ride",
          user: req.oidc.user,
          bio: dbUser.bio,
          data: demoData,
        });
        // console.log(demoData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
