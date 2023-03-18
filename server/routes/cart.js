const express = require("express");
const cartController = require("../controllers/Cart");
const router = express.Router();

router
  .route("/")
  .get(cartController.getProductInCart)
  .patch(cartController.updateProductInCart);

router.route("/:productID").delete(cartController.deleteProductInCart);
module.exports = router;
