const sql = require("mssql");
const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");

const SubImageSchema = new ModelSchema(
  {
    subimgID: new ModelSchemaValidator({
      name: "subimgID",
      sqlType: sql.Int,
      require: true,
    }),

    image: new ModelSchemaValidator({
      name: "image",
      sqlType: sql.VarChar,
      require: true,
    }),

    alt: new ModelSchemaValidator({
      name: "alt",
      sqlType: sql.VarChar,
      require: true,
    }),

    productID: new ModelSchemaValidator({
      name: "productID",
      sqlType: sql.Int,
      require: true,
    }),
  },
  "Subimg",
  "productID"
);

module.exports = SubImageSchema;
