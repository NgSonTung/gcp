const FeatureDAO = require("../DAO/FeatureDAO");

exports.getFeatureById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const features = await FeatureDAO.getFeatureById(id);
    if (!features) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `Not found features with Id ${id}!`,
        });
    }
    return res.status(200).json({
      code: 200,
      msg: `Got features with id ${id} successfully!`,
      data: {
        features,
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

exports.deleteFeatureById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const feature = await FeatureDAO.getFeatureById(id);
    if (!feature) {
      return res
        .status(404) //NOT FOUND
        .json({
          code: 404,
          msg: `feature with Id ${id} not found!`,
        });
    }
    await FeatureDAO.deleteFeatureById(id);
    return res.status(200).json({
      code: 200,
      msg: `Deleted feature with id ${id} successfully!`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      msg: e,
    });
  }
};
