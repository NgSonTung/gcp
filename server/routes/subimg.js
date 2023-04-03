const express = require("express");
const SubImageController = require("../controllers/Subimg");
const router = express.Router();
const authController = require("./../controllers/auth");
const StaticData = require("../utils/StaticData");

router
  .route("/:id")
  .get(SubImageController.getSubImgByProductId)
  .delete(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    SubImageController.deleteSubImgById
  )
  .patch(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    SubImageController.updateSubImgById
  );

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo(StaticData.AUTH.Role.admin),
    SubImageController.createNewSubImg
  );

router.route("/byProduct/:id").get(SubImageController.getSubImgByProductId);

router.route("/getFileImage/:imageName").get(SubImageController.getFileImage);

router.route("/saveFileImage").post(SubImageController.saveFileImage);
module.exports = router;
