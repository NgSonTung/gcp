const express = require("express");
const productController = require("../controllers/Product");
const authController = require("./../controllers/auth");
const StaticData = require("../utils/StaticData");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    productController.createNewProduct
  );

router
  .route("/productnonpagination")
  .get(productController.getProductNonPaginate);

router
  .route("/:id")
  .get(productController.getProductById)
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    productController.deleteById
  )
  .patch(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    productController.updateProductById
  );

module.exports = router;
