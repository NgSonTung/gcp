// import * as dbConfig from "~/database/dbConfig";
// import sql from "mssql";
// const dbConfig = require('./../database/dbconfig');
// const sql = require("mssql");
//query right here
const products = require("../../client/src/data/products.json");

exports.getAllProducts = async () => {
  const result = await fetch("https://api.npoint.io/b53d5a76cc3848425069");
  const products = await result.json();
  return products;
  // .then((res) => res.json())
  // .then((products) => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify(products));
  // });
};
