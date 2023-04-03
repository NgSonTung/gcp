const brandDAO = require("../DAO/BrandDAO");

exports.getAllBrands = async (req, res) => {
  try {
    let brands = await brandDAO.getBrands(req.query);
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: {
        brands,
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: "FAIL",
    });
  }
};
