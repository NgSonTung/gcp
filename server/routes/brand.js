const express = require("express");
const brandController = require("../controllers/brand");
const router = express.Router();

router.route("/").get(brandController.getAllBrands);

module.exports = router;
