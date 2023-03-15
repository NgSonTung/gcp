// const dbConfig = require("../database/dbconfig");
// const sql = require("mssql");
// const products = require("../../client/src/data/products.json");

exports.getAllProducts = async () => {
  const result = await fetch("https://api.npoint.io/b53d5a76cc3848425069");
  const products = await result.json();
  return products;
};
