const express = require("express");
const cartController = require("../controllers/Cart");
const router = express.Router();

router
  .route("/")
  .patch(cartController.updateProductInCart)
  .post(cartController.insertProductToCart);
router.route("/:productID").delete(cartController.deleteProductInCart);
router.route("/:userID").get(cartController.getProductInCartByUSerID);
module.exports = router;
