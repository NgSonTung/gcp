const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const form = req.body;
    if (!form.signUpPassword || !form.repeatPassword) {
      return res.status(403).json({
        code: 403,
        mgs: `Invalid Password`,
      });
    }

    //Check if username/email existed
  } catch (error) {}
};
