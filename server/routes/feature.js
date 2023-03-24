const express = require("express");
const FeatureController = require("../controllers/Feature");
const router = express.Router();

router
  .route("/featureById/:id")
  .get(FeatureController.getFeatureById)
  .delete(FeatureController.deleteFeatureById);

module.exports = router;
