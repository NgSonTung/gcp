const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");

const UserSchema = new ModelSchema(
  {
    userID: new ModelSchemaValidator({
      name: "userID",
      sqlType: sql.Int,
    }),
    userName: new ModelSchemaValidator({
      name: "userName",
      sqlType: sql.VarChar,
      require: true,
    }),
    password: new ModelSchemaValidator({
      name: "password",
      sqlType: sql.VarChar,
      require: true,
    }),
    auth: new ModelSchemaValidator({
      name: "auth",
      sqlType: sql.Int,
      require: true,
      validator: function (val) {
        return 0 || 1;
      },
    }),
    email: new ModelSchemaValidator({
      name: "email",
      require: true,
      sqlType: sql.VarChar,
    }),
  },
  "Users",
  "auth"
);

module.exports = UserSchema;