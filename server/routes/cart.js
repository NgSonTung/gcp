const express = require("express");
const cartController = require("../controllers/Cart");
const router = express.Router();

router.route("/").get(cartController.getProductInCart);

module.exports = router;
