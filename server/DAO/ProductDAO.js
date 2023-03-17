// const products = require("../../client/src/data/products.json");
const sql = require("mssql");
const ProductSchema = require("../model/Product");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");

// exports.getAllProducts = async () => {
//   const result = await fetch("https://api.npoint.io/b53d5a76cc3848425069");
//   const products = await result.json();
//   return products;
// };
exports.addProductIfNotExisted = async (product) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let insertData = ProductSchema.validateData(product);

  let query = `SET IDENTITY_INSERT ${ProductSchema.schemaName} ON insert into ${ProductSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      ProductSchema.schema,
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
    ` WHERE NOT EXISTS(SELECT * FROM ${ProductSchema.schemaName} WHERE name = @name)` +
    ` SET IDENTITY_INSERT ${ProductSchema.schemaName} OFF`;
  // console.log(query);

  let result = await request.query(query);

  // console.log(result);
  return result.recordsets;
};

exports.clearAll = async () => {
  query = `delete ${ProductSchema.schemaName}  DBCC CHECKIDENT ('[${ProductSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};

exports.getAllProducts = async (filter) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }

  let selectQuery = `SELECT * FROM PRODUCT`;
  const { filterStr } = dbUtils.getFilterProductsQuery(filter);
  if (filterStr) {
    selectQuery += filterStr;
  }
  let request = dbConfig.db.pool.request();
  // console.log(selectQuery);
  const result = await request.query(selectQuery);
  // let countResult = await dbConfig.db.pool.request().query(countQuery);
  return result.recordsets[0];
};
