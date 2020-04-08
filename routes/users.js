const express = require("express");
const User = require("../models/User");
require("dotenv").config();
const router = express.Router();
const path = require("path");
const client = require("twilio")(process.env.ACC_SID, process.env.AUTH_TOKEN);

router.get("/register", (req, res) => {
  res.render(path.join(path.dirname(__dirname), "views/register"), {
    extractScripts: true,
  });
});

router.get("/register/successful", (req, res) => {
  res.render(path.join(path.dirname(__dirname), "views/registration_success"), {
    name: req.body.name,
    extractScripts: true,
  });
});

// Adding a new user to DB
router.post("/add_user", async (req, res) => {
  try {
    const { name, number, state } = req.body;
    const new_user = await User.aggregate([{ $match: { number: number } }]);
    if (new_user.length != 0) {
      res.render(
        path.join(path.dirname(__dirname), "views/already_registered"),
        {
          message: "It Seems Like, This number is already registered with us.",
          extractScripts: true,
        }
      );
    } else {
      const user = new User({
        name: name,
        number: number,
        state: state,
      });
      const addedUser = await user.save();
      client.messages
        .create({
          body:
            'Thank You For Registering. You will receive Corona-Virus updates everyday.\nTo Stop the service reply with "STOP"',
          from: process.env.PHN_NUM,
          to: "+91" + req.body.number,
        })
        .then((msg) => {
          console.log(msg.sid);
          res.redirect("/users/register/successful?");
        });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Deleting a user from DB
router.delete("/:number", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ number: req.params.number });
    res.json({ message: removedUser });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
