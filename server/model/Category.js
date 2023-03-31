const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");
const CategorySchema = new ModelSchema(
  {
    categoryID: new ModelSchemaValidator({
      name: "categoryID",
      sqlType: sql.Int,
      require: true,
    }),
    categoryName: new ModelSchemaValidator({
      name: "categoryName",
      sqlType: sql.NVarChar,
      require: true,
    }),
  },
  "Category",
  "categoryID"
);

module.exports = CategorySchema;
