const express = require("express");
const ratingController = require("../controllers/Rating");
const router = express.Router();
const authController = require("./../controllers/auth");
const StaticData = require("../utils/StaticData");

router
  .route("/:id")
  .get(ratingController.getRatingById)
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    ratingController.deleteRatingById
  )
  .patch(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    ratingController.updateRatingById
  );
router.route("/").post(ratingController.createNewRating);
router.route("/byProduct/:id").get(ratingController.getRatingByProductId);
module.exports = router;
