const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const BrandShcema = require("../model/Brand");

exports.addBrandIfNotExists = async (brand) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let insertData = BrandShcema.validateData(brand);
  let query = `SET IDENTITY_INSERT ${BrandShcema.schemaName} ON insert into ${BrandShcema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(BrandShcema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${BrandShcema.schemaName} WHERE brandName = @brandName)` +
    ` SET IDENTITY_INSERT ${BrandShcema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};
