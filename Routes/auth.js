const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../Models/User");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "Email already registered" });
    }
    req.body.password = await getHash(req.body.password);
    let newUser = new User(req.body);
    await newUser.save();
    newUser.password = newUser.cnfpassword = null;
    return res.status(201).send({data: newUser});
  } catch (ex) {
    console.log(ex);
    return res.status(501).send({
      message: "Server error occured."
    });
  }
});

async function getHash(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({message: "Invalid email/password"});
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      let profile = user._doc;
      profile.password = profile.cnfpassword = null;
      const data = {
        accesstoken: user.generateAuthToken(),
        profile: profile,
      };
      return res.status(200).send(data);
    } else {
      return res.status(400).send({
        message: "Invalid email/password"
      });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(501).send({
      message:"Server error occured."
    });
  }
});

module.exports = router;
