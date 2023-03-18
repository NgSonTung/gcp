const CartDAO = require("../DAO/CartDAO");

exports.getProductInCart = async (req, res) => {
  let result = await CartDAO.getProductInCart();
  try {
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: "FAIL",
    });
  }
};
exports.insertProductToCart = async (req, res) => {
  let result = await CartDAO.addCart_ProductIfNotExisted(req.query);
  try {
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: "FAIL",
    });
  }
};

exports.updateProductInCart = async (req, res) => {
  console.log(req.body);
  let result = await CartDAO.updateCart(req.body);
  try {
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: "FAIL",
    });
  }
};
