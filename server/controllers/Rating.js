const RatingDAO = require("../DAO/RatingDAO");

exports.getRatingByProductId = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const rating = await RatingDAO.getRatingByProductId(id);
    if (!rating) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found rating with productID ${id}!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Got rating with productID ${id} successfully!`,
      data: {
        rating,
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

exports.createNewRating = async (req, res) => {
  const newRating = req.body;
  try {
    await RatingDAO.create(newRating);
    return res.status(200).json({
      code: 200,
      msg: `Created new rating successfully!`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};
