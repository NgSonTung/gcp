const UserDAO = require("../DAO/UserAccount");
exports.getAllUser = (req, res) => {
  res.status(200).json({
    code: 200,
    msg: "Get all user successfully!",
    data: { userArr },
  });
};
