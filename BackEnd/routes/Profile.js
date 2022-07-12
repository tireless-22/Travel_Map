const router = require("express").Router();
const { json } = require("express");
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const newProfile = new Profile(req.body);
  console.log(req.body);
  try {
    const savedProfile = await newProfile.save();
    res.status(200).json(newProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const profile = await Profile.find({ user: user });
    res.status(200).json(profile);
  } catch (err) {
    console.log("error occured in the api/pins/user");
    res.status(500).json(err);
  }
});

module.exports = router;
