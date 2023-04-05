const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/Upload");

router.route("/check").post(uploadController.checkDuplicateFile);
router.route("/save").post(uploadController.saveFileImage);

module.exports = router;
