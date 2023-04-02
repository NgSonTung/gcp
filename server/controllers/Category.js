const CategoryDAO = require("../DAO/CategoryDAO");

exports.getAllCategories = async (req, res) => {
  try {
    let categories = await CategoryDAO.getCategories(req.query);
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: {
        categories,
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: "FAIL",
    });
  }
};
