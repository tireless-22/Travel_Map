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
   const prof = {};
   prof.username = req.body.username;
   prof.firstname = req.body.firstname;
   prof.lastname = req.body.lastname;
   prof.mobile = req.body.mobile;
   prof.country = req.body.country;
   prof.address = req.body.address;
  console.log(prof);
  
  Profile.updateOne({ username: prof.username }, prof)
    .then(() => {
      res.status(200).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  
  



   
  
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



// app.put("/api/stuff/:id", (req, res, next) => {
//   const thing = new Thing({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId,
//   });
//   Thing.updateOne({ _id: req.params.id }, thing)
    // .then(() => {
    //   res.status(201).json({
    //     message: "Thing updated successfully!",
    //   });
    // })
    // .catch((error) => {
    //   res.status(400).json({
    //     error: error,
    //   });
    // });
// });











