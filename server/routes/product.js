const express = require("express");
const productController = require("../controllers/Product");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createNewProduct);

router
  .route("/productnonpagination")
  .get(productController.getProductNonPaginate);

router
  .route("/:id")
  .get(productController.getProductById)
  .delete(productController.deleteById);
// .patch(productController.updateProductById);
module.exports = router;
