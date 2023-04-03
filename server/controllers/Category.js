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

exports.getCategoryById = async (req, res) => {
  console.log("req.params", req.params);
  const id = req.params.id * 1;
  try {
    const category = await CategoryDAO.getCategoryById(id);
    if (!category) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found category with Id ${id}!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Got category with id ${id} successfully!`,
      data: {
        category,
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
