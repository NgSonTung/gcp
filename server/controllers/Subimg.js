const SubImageDAO = require("../DAO/SubImageDAO");
const ProductDAO = require("../DAO/ProductDAO");
const path = require("path");
const fs = require("fs");
exports.getSubImgByProductId = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const subimgs = await SubImageDAO.getProductSubImgById(id);
    if (!subimgs) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found subimgs with productId ${id}!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Got subimgs with id ${id} successfully!`,
      data: {
        subimgs,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};

exports.getSubImgById = async (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  try {
    const subImg = await SubImageDAO.getSubImgById(id);
    if (!subImg) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found subImg with Id ${id}!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Got subImg with id ${id} successfully!`,
      data: {
        subImg,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};

exports.createNewSubImg = async (req, res) => {
  const newSubImg = req.body;
  try {
    await SubImageDAO.createNewSubImg(newSubImg);
    // console.log(`Created new product successfully!`);
    return res.status(200).json({
      code: 200,
      msg: `Created new subImg successfully!`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: `SubImg create failed`,
    });
  }
};

exports.deleteSubImgById = async (req, res) => {
  const id = req.params.id * 1;
  console.log("id", id);
  try {
    const subImg = await SubImageDAO.getSubImgById(id);
    if (!subImg) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `subImg with Id ${id} not found!`,
        });
    }
    await SubImageDAO.deleteSubImgById(id);
    return res.status(200).json({
      code: 200,
      msg: `Deleted subImg with id ${id} successfully!`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};

exports.updateSubImgById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const updateInfo = req.body;
    let subImg = await SubImageDAO.getSubImgById(id);
    if (!subImg) {
      return res.status(404).json({
        code: 404,
        msg: `Not found subImg with Id ${id}!`,
      });
    }
    await SubImageDAO.updateSubImgById(id, updateInfo);
    subImg = await SubImageDAO.getSubImgById(id);
    return res.status(200).json({
      code: 200,
      msg: `Updated subImg with id: ${id} successfully!`,
      data: {
        subImg,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: `Update subImg with id: ${id} failed!`,
    });
  }
};

exports.getFileImage = (req, res) => {
  let imageName = req.params.imageName;
  let folderImage;
  if (imageName.includes("product")) {
    folderImage = "productImages";
  } else {
    folderImage = "subImgimages";
  }
  // const id = parseInt(imageName.match(/\d+/)[0]);
  // imageName = `image${id}.jpg`;
  const imagePath = path.join(
    __dirname,
    "..",
    "dev-data",
    folderImage,
    imageName
  );
  // console.log(imagePath);
  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(res);
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
    const Name = "product" + infor.imageName;
    img = {
      image: Name,
    };
    await ProductDAO.updateProductById(infor.productID, img);
  }
};
