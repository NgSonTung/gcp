const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/").get(userController.getAllUser).post(userController.addUser);
module.exports = router;
