const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/:username").get(userController.getUserByUserName);

// router.param("id", userController.checkID);

router.route("/:id").get(userController.getUser);
router.route("/").get(userController.getAllUser).post(userController.addUser);
module.exports = router;
