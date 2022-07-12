const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    firstname: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      
    },
    lastname: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      
    },
    mobile: {
      type: Number,
      require: true,
      // min: 3,
      // max: 40,
      
    },
    country: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      
    },

    address: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
