const config = require("../config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

/* Users Table/Schema Starts*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 127,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    cnfpassword: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      default: "user",
    },
    phoneNo: {
      type: Number,
    },
    landInfo: [
      {
        address: String,
        landmark: String,
        pincode: Number,
        district: String,
        state: String,
        sizeOfLand: Number,
        landSizeUnit: String,
        waterSource: String,
        infoAboutCrop: String,
        cropInfo: {
          type: Object,
          default: {
            state: String,
            district: String,
            cropYear: Number,
            season: String,
            crop: String,
            area: String,
            production: Number,
          },
        },
      },
    ]
  },
  { timestamps: true }
);

// Method that returns JWT auth-token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      role: this.role,
      email: this.email,
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
