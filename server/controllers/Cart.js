const CartDAO = require("../DAO/CartDAO");

exports.getProductInCart = async (req, res) => {
  console.log(req.query);

  let result = await CartDAO.getProductInCart();
  console.log(result);
  res.status(200).json({
    code: 200,
    msg: "OK",
    data: {
      result,
    },
  });
};
