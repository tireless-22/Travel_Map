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