const UserSchema = require("../model/User");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const bcrypt = require("bcryptjs");

exports.addUserIfNotExisted = async (user) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  user.createdAt = new Date().toISOString();

  let insertData = UserSchema.validateData(user);
  insertData.password = await bcrypt.hash(insertData.password, 10);
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

exports.insertUser = async (user) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  // console.log("user auth", user.auth);
  user.createdAt = new Date().toISOString();
  let insertData = UserSchema.validateData(user);
  // console.log(insertData);
  insertData.password = await bcrypt.hash(insertData.password, 10);

  let query = `insert into ${UserSchema.schemaName} `;

  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      UserSchema.schema,
      dbConfig.db.pool.request(),
      insertData
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  query += " (" + insertFieldNamesStr + ") select  " + insertValuesStr;
  let result = await request.query(query);
  return result.recordsets;
};

exports.clearAll = async () => {
  query = `delete ${UserSchema.schemaName}  DBCC CHECKIDENT ('[${UserSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};

exports.getUserById = async (id) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let result = await dbConfig.db.pool
    .request()
    .input(UserSchema.schema.userID.name, UserSchema.schema.userID.sqlType, id)
    .query(
      `SELECT * from ${UserSchema.schemaName} where ${UserSchema.schema.userID.name} = @${UserSchema.schema.userID.name}`
    );

  // console.log(result);

  if (result.recordsets[0].length > 0) {
    return result.recordsets[0][0];
  }

  return null;
};

exports.getUserByUserName = async (username) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let result = await dbConfig.db.pool
    .request()
    .input(
      UserSchema.schema.userName.name,
      UserSchema.schema.userName.sqlType,
      username
    )
    .query(
      `SELECT * from ${UserSchema.schemaName} where ${UserSchema.schema.userName.name} = @${UserSchema.schema.userName.name}`
    );
  console.log(
    `SELECT * from ${UserSchema.schemaName} where ${UserSchema.schema.userName.name} = @${UserSchema.schema.userName.name}`
  );
  console.log("result", result);
  if (result.recordsets[0].length > 0) {
    return result.recordsets[0][0];
  }

  return null;
};

// exports.getUserByUserName = async (username) => {
//   if (!dbConfig.db.pool) {
//     throw new Error("Not connected to db");
//   }
//   let result = await dbConfig.db.pool
//     .request()
//     .input(
//       UserSchema.schema.userName.name,
//       UserSchema.schema.userName.sqlType,
//       username
//     )
//     .query(
//       `SELECT * from ${UserSchema.schemaName} where ${UserSchema.schema.userName.name} = @${UserSchema.schema.userName.name}`
//     );

//   if (result.recordsets[0].length > 0) {
//     return result.recordsets[0][0];
//   }

//   return null;
// };
