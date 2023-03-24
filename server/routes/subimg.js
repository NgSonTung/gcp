const express = require("express");
const SubImageController = require("../controllers/Subimg");
const router = express.Router();

router.route("/subImgById/:id").get(SubImageController.getSubImgById);

module.exports = router;
