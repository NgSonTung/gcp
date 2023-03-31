const { CartSchema, Cart_ProductSchema } = require("../model/Cart");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const UserSchema = require("../model/User");
exports.addCartIfNotExisted = async (cart) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  cart.createdAt = new Date().toISOString();

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

exports.createNewCart = async (userID) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let result = await dbPool
    .request()
    .input(
      CartSchema.schema.userID.name,
      CartSchema.schema.userID.sqlType,
      userID
    )
    .query(
      `insert into ${CartSchema.schemaName} values (@${CartSchema.schema.userID.name})`
    );
  console.log(result);
  return result;
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
    ` WHERE NOT EXISTS(SELECT * FROM ${Cart_ProductSchema.schemaName} WHERE cartID = @cartID and productID = @productID)`; //tam thoi;
  let result = await request.query(query);
  return result.recordsets;
};

exports.getProductInCartByUSerID = async (userID) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }

  // console.log(query);
  let result = await dbPool
    .request()
    .input(
      CartSchema.schema.userID.name,
      CartSchema.schema.userID.sqlType,
      userID
    ).query(`select p.*,cp.amount,cp.cartID from product p
  inner join cart_product cp on cp.productID = p.productID
  inner join cart c on cp.cartID = c.cartID
  where c.userID =@userID`);
  // console.log(result.recordsets);
  return result.recordsets[0];
};

exports.getCartIDByUserName = async (username) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }

  let result = await dbPool
    .request()
    .input(
      UserSchema.schema.userName.name,
      UserSchema.schema.userName.sqlType,
      username
    )
    .query(
      `select cartID from ${CartSchema.schemaName} where userID in (select userID from ${UserSchema.schemaName} where userName = @${UserSchema.schema.userName.name}) `
    );
  return result.recordsets[0][0];
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
  let result = await request.query(q);
  return result.recordsets;
};

exports.deleteItemInCart = async (productID) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let q = `delete cart_product where productID = ${productID} `;
  let result = await dbPool.request().query(q);
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
