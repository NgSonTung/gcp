const fs = require("fs");
const path = require("path");
const ProductDAO = require("../DAO/ProductDAO");
const SubImageDAO = require("../DAO/SubImageDAO");

exports.checkDuplicateFile = (req, res) => {
  let infor = req.body;
  const imagePath = path.join(
    __dirname,
    "..",
    "dev-data",
    infor.folderImage,
    infor.imageName
  );
  fs.stat(imagePath, (err, stats) => {
    if (err) {
      //   console.error("File does not exist");
      res.status(200).json({ existed: false });
    } else {
      //   console.log("File exists");
      res.status(200).json({ existed: true });
    }
  });
};
exports.saveFileImage = async (req, res) => {
  let infor = req.body;
  const imagePath = path.join(
    __dirname,
    "..",
    "dev-data",
    infor.folderImage,
    infor.imageName
  );
  // console.log("imagePath", imagePath);
  const buffer = Buffer.from(infor.blob, "base64");
  fs.writeFile(imagePath, buffer, (err) => {
    if (err) {
      // console.error(err);
      res.status(500).json({ error: "Failed to save the file." });
    } else {
      // console.log("File saved successfully.");
      res.status(200).json({ message: "File ssaved successfully." });
    }
  });
  let img;
  if (infor.folderImage == "subImgimages") {
    img = {
      image: infor.imageName,
      alt: infor.alt,
      productID: infor.productID,
    };
    await SubImageDAO.addImage(img);
  } else {
    img = {
      image: infor.imageName,
    };
    await ProductDAO.updateProductById(infor.productID, img);
  }
};
