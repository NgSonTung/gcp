const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/").get(userController.getAllUser);

module.exports = router;
