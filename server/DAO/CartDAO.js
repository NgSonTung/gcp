const { CartSchema, Cart_ProductSchema } = require("../model/Cart");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
exports.addCartIfNotExisted = async (cart) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let insertData = CartSchema.validateData(cart);
  let query = `SET IDENTITY_INSERT ${CartSchema.schemaName} ON insert into ${CartSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(CartSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${CartSchema.schemaName} WHERE userID = @userID)` +
    ` SET IDENTITY_INSERT ${CartSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};

exports.addCart_ProductIfNotExisted = async (cart_Product) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let insertData = Cart_ProductSchema.validateData(cart_Product);
  let query = `insert into ${Cart_ProductSchema.schemaName}`;
  const { request, insertFieldNamesStr, insertValuesStr } =
    dbUtils.getInsertQuery(
      Cart_ProductSchema.schema,
      dbPool.request(),
      insertData
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") SELECT  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${Cart_ProductSchema.schemaName} WHERE productID = @productID)`; //tam thoi;
  let result = await request.query(query);
  return result.recordsets;
};

exports.getProductInCart = async () => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }

  const query = `select p.*,cp.amount,cp.cartID from product p inner join cart_product cp on cp.productID = p.productID
  `;
  // console.log(query);
  let result = await dbPool.request().query(query);
  // console.log(result.recordsets);
  return result.recordsets[0];
};

exports.updateCart = async (cart_Product) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let updateData = Cart_ProductSchema.validateData(cart_Product);
  let q = `update ${Cart_ProductSchema.schemaName} set `;

  const { request, updateStr } = dbUtils.getUpdateQuery(
    Cart_ProductSchema.schema,
    dbPool.request(),
    updateData
  );

  q += updateStr + ` where productID =@productID`;
  console.log(q);
  let result = await request.query(q);
  return result.recordsets;
};

exports.clearAllCart_Product = async () => {
  query = `delete ${Cart_ProductSchema.schemaName} ;`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
exports.clearAllCart = async () => {
  query = `delete ${CartSchema.schemaName}  DBCC CHECKIDENT ('[${CartSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
