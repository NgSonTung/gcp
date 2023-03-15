const ProductDAO = require("../DAO/ProductDAO");

exports.getProducts = async (req, res) => {
  const products = await ProductDAO.getAllProducts();
  res.status(200).json({
    code: 200,
    msg: "OK",
    data: {
      products,
    },
  });
};
