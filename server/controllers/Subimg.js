const SubImageDAO = require("../DAO/SubImageDAO");

exports.getSubImgById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const subimgs = await SubImageDAO.getProductSubImgById(id);
    if (!subimgs) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found subimgs with Id ${id}!`,
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
