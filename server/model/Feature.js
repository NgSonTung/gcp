const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const FeatureSchema = new ModelSchema(
  {
    featureID: new ModelSchemaValidator({
      name: "featureID",
      sqlType: sql.Int,
      require: true,
    }),
    feature: new ModelSchemaValidator({
      name: "feature",
      sqlType: sql.NVarChar,
      require: true,
      default: "",
    }),
    productID: new ModelSchemaValidator({
      name: "productID",
      sqlType: sql.Int,
      require: true,
    }),
  },
  "feature",
  "featureID"
);
module.exports = FeatureSchema;
