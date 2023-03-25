const ProductDAO = require("../DAO/ProductDAO");
const ProductSchema = require("../model/Product");

exports.getProducts = async (req, res) => {
  // console.log(req.query);
  const products = await ProductDAO.getAllProducts(req.query);
  // console.log(products);
  res.status(200).json({
    code: 200,
    msg: "OK",
    data: {
      products,
    },
  });
};

exports.getProductById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const product = await ProductDAO.getProductById(id);
    if (!product) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found product with Id ${id}!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Got product with id ${id} successfully!`,
      data: {
        product,
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

exports.createNewProduct = async (req, res) => {
  const newProduct = req.body;
  try {
    let product = await ProductDAO.getProductByName(newProduct.name);
    if (product) {
      return res
        .status(403) //Forbidden
        .json({
          code: 403,
          msg: `Product name duplicate!`,
        });
    }
    await ProductDAO.createNewProduct(newProduct);
    product = await ProductDAO.getProductByName(newProduct.name);
    // console.log(`Created new product successfully!`);
    return res.status(200).json({
      code: 200,
      msg: `Created new product successfully!`,
      data: {
        product,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: `Product create failed`,
    });
  }
};

exports.deleteById = async (req, res) => {
  const id = req.params.id * 1;
  console.log("id", id);
  try {
    const product = await ProductDAO.getProductById(id);
    if (!product) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Product with Id ${id} not found!`,
        });
    }
    await ProductDAO.deleteProductById(id);
    return res.status(200).json({
      code: 200,
      msg: `Deleted product with id ${id} successfully!`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};

exports.getProductNonPaginate = async (req, res) => {
  try {
    const products = await ProductDAO.getProductsNotPagination(req.query);
    if (!products) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Products list not found!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Find products list successfully!`,
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};

exports.updateProductById = async (req, res) => {
  // console.log("Id update", req.params.id);
  const id = req.params.id * 1;
  try {
    const updateInfo = req.body;
    let product = await ProductDAO.getProductById(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        msg: `Not found product with Id ${id}!`,
      });
    }
    await ProductDAO.updateProductById(id, updateInfo);
    product = await ProductDAO.getProductById(id);
    return res.status(200).json({
      code: 200,
      msg: `Updated product with id: ${id} successfully!`,
      data: {
        product,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: `Update product with id: ${id} failed!`,
    });
  }
};
