const UserDAO = require("../DAO/UserAccount");

exports.checkID = async (req, res, next, val) => {
  try {
    const id = val;
    let user = await UserDAO.getUserById(id);
    if (!user) {
      return res
        .status(404) /// 404 - NOT FOUND!
        .json({
          code: 404,
          msg: `Not found user with id ${id}`,
        });
    }
    req.user = user;
  } catch (e) {
    console.error(e);
    return res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
  next();
};

exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      code: 200,
      msg: "OK",
      data: { user },
    });
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};

exports.getUserByUserName = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const user = await UserDAO.getUserByUserName(username);
    if (!user) {
      return res
        .status(404) /// 404 - NOT FOUND!
        .json({
          code: 404,
          msg: `Not found user with name ${username}`,
        });
    }
    res.status(200).json({
      code: 200,
      msg: `found user with name ${username}`,
      data: { user },
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500) // 500 - Internal Error
      .json({
        code: 500,
        msg: e.toString(),
      });
  }
};
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
