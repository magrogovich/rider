const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const router = express.Router();
const User = require("../models/user");
const Ride = require("../models/ride");

router.post("/:id", requiresAuth(), (req, res) => {
  Ride.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/myrides");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
