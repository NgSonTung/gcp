const UserSchema = require("../model/User");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");

exports.addUserIfNotExisted = async (user) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let insertData = UserSchema.validateData(user);
  let query = `SET IDENTITY_INSERT ${UserSchema.schemaName} ON insert into ${UserSchema.schemaName}`;
  // schema, request, insert
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      UserSchema.schema,
      dbConfig.db.pool.request(),
      insertData
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${UserSchema.schemaName} WHERE userName = @userName)` +
    ` SET IDENTITY_INSERT ${UserSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};
