const express = require("express");
const router = express.Router();
const { SoilTest } = require("../Models/SoilInfo");
const uAuthenticator = require("../Middlewares/uAuthenticator");
const aAuthenticator = require("../Middlewares/aAuthenticator");

router.post("/newTest", [uAuthenticator], async (req, res) => {
  try {
    let soiltestdata = req.body.data;
    soiltestdata.forEach((data) => {
      data.userId = req.authUser._id;
    });
    //let soiltest = new SoilTest(soiltestdata);
    let result = await SoilTest.insertMany(soiltestdata);
    if (result) {
      // console.log(result);
      return res.status(200).send(result);
    } else
      return res
        .status(400)
        .send({ message: "Error occured while creating soil request." });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ message: "Server error occured." });
  }
});



router.post("/soilInfo", [uAuthenticator], async (req, res) => {
  try {
    const soiltestId = req.body.soiltestId;
    const soilInfo = req.body.soilInfo;
    let soiltestData = await SoilTest.findOne({ _id: soiltestId });
    if (!soiltestData) {
      return res
        .status(404)
        .send({ message: "Soil test request doesn't exist" });
    }
    soiltestData.soilInfo = soilInfo;
    await soiltestData.save();
    return res.status(200).send(soiltestData);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ message: "Server error occured." });
  }
});

router.post("/cropInfo", [uAuthenticator], async (req, res) => {
  try {
    const soiltestId = req.body.soiltestId;
    const cropInfo = req.body.cropInfo;
    let soiltestData = await SoilTest.findOne({ _id: soiltestId });
    if (!soiltestData) {
      return res
        .status(404)
        .send({ message: "Soil test request doesn't exist" });
    }
    soiltestData.cropInfo = cropInfo;
    await soiltestData.save();
    return res.status(200).send(soiltestData);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ message: "Server error occured." });
  }
});

router.get("/mytests", [uAuthenticator], async (req, res) => {
  try {
    let soiltestData = await SoilTest.find({ userId: req.authUser._id });
    return res.status(200).send(soiltestData);
  } catch (ex) {
    console.log(ex);
    return res.status(501).send({ message: "Server error occured." });
  }
});

router.delete("/mytests/:soiltestId", [uAuthenticator], async (req, res) => {
  const soiltestId = req.params.soiltestId;
  let soilTestData = await SoilTest.findOne({ _id: soiltestId });
  if (!soilTestData) {
    return res.status(404).send({ message: "Soil test request doesn't exist" });
  }  
  try {
    let soiltestData = await SoilTest.deleteOne(soilTestData);
    return res.status(200).send(soiltestData);
  } catch (ex) {
    console.log(ex);
    return res.status(501).send({ message: "Server error occured." });
  }
});

router.get("/alltests", [uAuthenticator], async (req, res) => {
  try {
    let soiltestData = await SoilTest.find();
    return res.status(200).send(soiltestData);
  } catch (ex) {
    console.log(ex);
    return res.status(501).send({ message: "Server error occured." });
  }
});

router.post("/uploadReport/:soiltestId", [uAuthenticator], async (req, res) => {
  const soiltestId = req.params.soiltestId;
  let soilTestData = await SoilTest.findOne({ _id: soiltestId });
  if (!soilTestData) {
    return res.status(404).send({ message: "Soil test request doesn't exist" });
  }
  try {
    var base64report = Buffer.from(req.files[0].buffer).toString("base64");
    soilTestData.report = base64report;
    soilTestData.status = "Completed Report";
    await soilTestData.save();
    return res.status(200).send(soilTestData);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ message: "Server error occured." });
  }
});

router.get(
  "/downloadReport/:soiltestId",
  [uAuthenticator],
  async (req, res) => {
    try {
      const soiltestId = req.params.soiltestId;
      let soilTestData = await SoilTest.findOne({ _id: soiltestId });
      if (!soilTestData) {
        return res
          .status(404)
          .send({ message: "Soil test request doesn't exist" });
      }
      return res.status(200).send(soilTestData.report);
    } catch (ex) {
      console.log(ex);
      return res.status(500).send({ message: "Server error occured." });
    }
  }
);

// uploadPrediction
router.post(
  "/uploadPrediction/:soiltestId",[aAuthenticator],
  async (req, res) => {
    const soiltestId = req.params.soiltestId;
    let soilTestData = await SoilTest.findOne({ _id: soiltestId });
    if (!soilTestData) {
      return res.status(404).send({ message: "Soil test request doesn't exist" });
    }
    try {
      var base64report = Buffer.from(req.files[0].buffer).toString("base64");
      soilTestData.prediction = base64report;
      soilTestData.predictionStatus = "Completed Predication";
      await soilTestData.save();
      return res.status(200).send({ res: soilTestData });
    } catch (ex) {
      console.log(ex);
      return res.status(500).send({ message: "Server error occured." });
    }
  }
);
router.get("/downloadPrediction/:soiltestId", [], async (req, res) => {
  try {
    const soiltestId = req.params.soiltestId;
    let soilTestData = await SoilTest.findOne({ _id: soiltestId });
    if (!soilTestData) {
      return res.status(404).send({ message: "Soil test request doesn't exist" });
    }
    return res.status(200).send(soilTestData.prediction);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ message: "Server error occured." });
  }
});

module.exports = router;
