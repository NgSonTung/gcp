const ProductDAO = require("../DAO/ProductDAO");

exports.getProducts = async (req, res) => {
  console.log(req.query);
  const products = await ProductDAO.getAllProducts(req.query);
  console.log(products);
  res.status(200).json({
    code: 200,
    msg: "OK",
    data: {
      products,
    },
  });
};
