const router = require("express").Router();
const { json } = require("express");
const Profile = require("../models/Profile");

//  const prof = {};
//  prof.username = req.body.username;
//  prof.firstname = req.body.firstname;
//  prof.lastname = req.body.lastname;
//  prof.mobile = req.body.mobile;
//  prof.country = req.body.country;
//  prof.address = req.body.address;
//  console.log(prof);




router.post("/", async (req, res) => {
  const prof = {}
  prof.username = req.body.username;
  prof.firstname = req.body.firstname;
  prof.lastname = req.body.lastname;
  prof.mobile = req.body.mobile;
  prof.country = req.body.country;
  prof.address = req.body.address;
  console.log(prof);
  
    // res.json("Hello")
  
  try {
  const newProfile = new Profile(prof);
    const savedProfile = await newProfile.save();
    console.log("Hello")
    res.status(200).json(savedProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  console.log(req.body);
});

router.get("/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const profile = await Profile.find({ username: user });
    if (!profile) {
      res.status(200).json(-1);
    }
    res.status(200).json(profile);
  } catch (err) {
    console.log("error occured in the api/pins/user");
    res.status(500).json(err);
  }
});

module.exports = router;
