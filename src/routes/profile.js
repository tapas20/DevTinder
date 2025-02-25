const express = require("express");
const profileRouter = express.Router();

const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}'s your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

// profile/changePassword
profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const loggedInUser = req.user;

    const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;
    await loggedInUser.save();

    res.send("Password changed successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
