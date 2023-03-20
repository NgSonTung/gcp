const express = require("express");
const ratingController = require("../controllers/Rating");
const router = express.Router();

router.route("/").get().post(ratingController.createNewRating);

router
  .route("/byProduct/:id")
  .get(ratingController.getRatingByProductId)
  .delete()
  .patch();
module.exports = router;
