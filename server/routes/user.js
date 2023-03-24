const userController = require("../controllers/user");
const router = express.Router();
const express = require("express");

router.route("/").get(userController.getAllUser);
