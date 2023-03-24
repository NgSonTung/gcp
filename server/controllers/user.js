const UserDAO = require("../DAO/UserAccount");

exports.addUser = async (req, res) => {
  try {
    let result = await UserDAO.addUser(req.body);
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
