const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcrypt');
// console.log("outside Reg")
router.post("/register",async (req,res)=>{
    // console.log("Inside reg")
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        console.log(req.body)
        const newUser = new User({
            
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })
        const user = await newUser.save();
        res.status(200).json(user._id);

    }catch(err){
        // console.log(newUser.username)
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/login",async (req,res)=>{
    console.log("Inside login")
    try{
        
        const user = await User.findOne({username:req.body.username});
        // console.log(user)
        !user &&res.status(400).json("Wrong username or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword &&res.status(400).json("Wrong username or password");
        
        res.status(200).json({_id:user._id,username: user.username});   

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;


