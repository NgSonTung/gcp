const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const CategorySchema = require("../model/Category");

exports.addCateIfNotExists = async (cate) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  cate.createdAt = new Date().toISOString();

  let insertData = CategorySchema.validateData(cate);
  let query = `SET IDENTITY_INSERT ${CategorySchema.schemaName} ON insert into ${CategorySchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(CategorySchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${CategorySchema.schemaName} WHERE categoryName = @categoryName)` +
    ` SET IDENTITY_INSERT ${CategorySchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};

exports.clearAll = async () => {
  query = `delete ${CategorySchema.schemaName}  DBCC CHECKIDENT ('[${CategorySchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
