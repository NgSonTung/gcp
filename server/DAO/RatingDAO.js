const RatingSchema = require("../model/Rating");
const dbconfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
exports.addRatingIfNotExisted = async (rating) => {
  const dbPool = dbconfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let query = `SET IDENTITY_INSERT ${RatingSchema.schemaName} ON insert into ${RatingSchema.schemaName}`;

  let insertData = RatingSchema.validateData(rating);
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(RatingSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${RatingSchema.schemaName} WHERE productID = @productID)` +
    ` SET IDENTITY_INSERT ${RatingSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};
exports.clearAll = async () => {
  query = `delete ${RatingSchema.schemaName}  DBCC CHECKIDENT ('[${RatingSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbconfig.db.pool.request().query(query);
  return result.recordsets;
};
