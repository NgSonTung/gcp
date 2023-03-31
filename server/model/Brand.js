const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");
const BrandSchema = new ModelSchema(
  {
    brandID: new ModelSchemaValidator({
      name: "brandID",
      sqlType: sql.Int,
      require: true,
    }),
    brandName: new ModelSchemaValidator({
      name: "brandName",
      sqlType: sql.NVarChar,
      require: true,
    }),
  },
  "Brand",
  "BrandID"
);

module.exports = BrandSchema;
