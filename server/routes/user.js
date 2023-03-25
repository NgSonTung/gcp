const express = require("express");
const authController = require("./../controllers/auth");
const userController = require("../controllers/user");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

// router.param("id", userController.checkID);

router.route("/:id").get(userController.getUser);
router.route("/").post(userController.addUser);

router.route("/username/:username").get(userController.getUserByUserName);

module.exports = router;
