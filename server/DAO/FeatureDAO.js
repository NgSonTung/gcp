const FeatureSchema = require("../model/Feature");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");

exports.addFeatureIfNotExisted = async (feature) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let insertData = FeatureSchema.validateData(feature);
  let query = `SET IDENTITY_INSERT ${FeatureSchema.schemaName} ON insert into ${FeatureSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(FeatureSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${FeatureSchema.schemaName} WHERE feature = @feature)` +
    ` SET IDENTITY_INSERT ${FeatureSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};
exports.clearAll = async () => {
  query = `delete ${FeatureSchema.schemaName}  DBCC CHECKIDENT ('[${FeatureSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};

exports.getFeatureById = async (id) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request
    .input(
      `${FeatureSchema.schema.productID.name}`,
      FeatureSchema.schema.productID.sqlType,
      id
    )
    .query(
      `select * from ${FeatureSchema.schemaName} where ${FeatureSchema.schema.productID.name} = @${FeatureSchema.schema.productID.name}`
    );
  return result.recordsets[0][0];
};

exports.deleteFeatureById = async (id) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request
    .input(
      `${FeatureSchema.schema.productID.name}`,
      FeatureSchema.schema.productID.sqlType,
      id
    )
    .query(
      `delete from ${FeatureSchema.schemaName} where ${FeatureSchema.schema.productID.name} = @${FeatureSchema.schema.productID.name}`
    );
  return result.recordsets;
};
