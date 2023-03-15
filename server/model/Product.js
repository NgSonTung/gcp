
const sql = require('mssql')
const ModelSchemaValidator = require("./ModelSchemaValidator");
const ModelSchema = require("./ModelSchema");




const ProductSchema = new ModelSchema(
    {
        productId: new ModelSchemaValidator({
            name: 'productId',
            sqlType: sql.Int,
        }),
        stock: new ModelSchemaValidator({
            name: 'stock',
            sqlType: sql.Int,
        }),
        name: new ModelSchemaValidator({
            name: 'name',
            sqlType: sql.NVarChar,
            require: true,
        }),
        favorite: new ModelSchemaValidator({
            name: 'favorite',
            sqlType: sql.Int,
            require: true,
            validator:  function (val) {
                return  0 || 1;
            },
        }),
        brand: new ModelSchemaValidator({
            name: 'brand',
            sqlType: sql.VarChar,
            require: true,
        }),
        price: new ModelSchemaValidator({
            name: 'price',
            sqlType: sql.Float,
            require: true,
        }),
        category: new ModelSchemaValidator({
            name: 'category',
            sqlType: sql.VarChar,
            require: true,
        }),
        sale: new ModelSchemaValidator({
            name: 'sale',
            sqlType: sql.NVarChar,
            default: "",
        }),
        description: new ModelSchemaValidator({
            name: 'description',
            sqlType: sql.NVarChar,
            require: true,
            validator:  function (val) {
                return val.length > 0;
            }
        }),
    }, 'Product', ''
)
module.exports = ProductSchema;