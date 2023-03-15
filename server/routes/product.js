const express = require("express");
const productController = require("../controllers/Product");
const router = express.Router();

router.route("/").get(productController.getProducts).post();

router.route("/:id").get().delete().patch;
module.exports = router;
