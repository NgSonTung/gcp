const SubImageSchema = require("../model/SubImage");
const dbUtils = require("../utils/dbUtils");
const dbConfig = require("../database/dbconfig");

exports.addSubImageIfNotExisted = async (img) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let insertData = SubImageSchema.validateData(img);

  let query = `SET IDENTITY_INSERT ${SubImageSchema.schemaName} ON insert into ${SubImageSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(SubImageSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${SubImageSchema.schemaName} WHERE url = @url)` +
    ` SET IDENTITY_INSERT ${SubImageSchema.schemaName} OFF`;
  // console.log(query);

  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
};
exports.clearAll = async () => {
  query = `delete ${SubImageSchema.schemaName}  DBCC CHECKIDENT ('[${SubImageSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};

exports.getProductSubImgById = async (id) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request
    .input(
      `${SubImageSchema.schema.productID.name}`,
      SubImageSchema.schema.productID.sqlType,
      id
    )
    .query(
      `select * from ${SubImageSchema.schemaName} where ${SubImageSchema.schema.productID.name} = @${SubImageSchema.schema.productID.name}`
    );
  return result.recordsets[0][0];
};
