const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");

const CartSchema = new ModelSchema(
  {
    cartID: new ModelSchemaValidator({
      name: "cartID",
      sqlType: sql.Int,
      require: true,
    }),
    userID: new ModelSchemaValidator({
      name: "userID",
      sqlType: sql.Int,
      require: true,
    }),
  },
  "Cart",
  "cartID"
);
const Cart_ProductSchema = new ModelSchema(
  {
    cartID: new ModelSchemaValidator({
      name: "cartID",
      sqlType: sql.Int,
      require: true,
    }),
    productID: new ModelSchemaValidator({
      name: "productID",
      sqlType: sql.Int,
      require: true,
    }),
    amount: new ModelSchemaValidator({
      name: "amount",
      sqlType: sql.Int,
      require: true,
    }),
  },
  "Cart_Product",
  "amount"
);

module.exports = { CartSchema, Cart_ProductSchema };
