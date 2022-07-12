const router = require("express").Router();
const { json } = require("express");
const Pin = require("../models/Pin")

router.post("/",async (req,res)=>{
    const newPin = new Pin(req.body)
    console.log(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
})

// router.get("/",(req,res)=>{
//     res.send("Heloo")
// })


router.get("/:name", async (req, res) => {
    
    const userName = req.params.name;


    // const user = "knk";
    console.log(userName)
    console.log(typeof(userName));
    
    try {
        const pinss = await Pin.find({ username: userName })
        console.log(pinss);
        res.status(200).json(pinss);

    }
    catch (err) {
        console.log("error occured in the api/pins/user");
        res.status(500).json(err);
    }
    // res.send("Hello")
})



router.get("/",async (req,res)=>{
    try{
        
        const pins = await Pin.find();
        // console.log(pins)
        res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router