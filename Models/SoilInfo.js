const mongoose = require("mongoose");
/* Users Table/Schema Starts*/
const soilSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
      trim: true,
    },
    requestor: {
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
      trim: true,
      lowercase: true,
    },
    phoneNo:{
      type:Number
    },
    requestedFor: {
      type: String,
      enum: ["Self", "Other"],
      default: "Self",
    },
    status: {
      type: String,
      enum: ["Pending Report", "Completed Report"],
      default: "Pending Report",
    },
    report: {
      type: String,
      default: null,
    },
    landInfo: {
      name: String,
      address: String,
      landmark: String,
      pincode: Number,
      district: String,
      state: String,
      sizeOfLand: Number,
      landSizeUnit: String,
      waterSource: String,
      infoAboutCrop: String,
    },
    soilInfo: {
      type: Object,
      default: {
        soilType: String,
        temperature: String,
        humidity: String,
        ph: String,
        rainfall: String,
        crop: String,
      },
    },
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
    prediction: {
      type: String,
      default: null,
    },
    predictionStatus: {
      type: String,
      enum: ["Pending Prediction", "Completed Prediction"],
      default: "Pending Prediction",
    },
  },
  { timestamps: true }
);

//Creating the Schema/Table in Database
const SoilTest = mongoose.model("SoilTest", soilSchema);

exports.SoilTest = SoilTest;
