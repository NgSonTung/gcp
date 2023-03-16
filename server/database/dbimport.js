// import * as dotenv from "dotenv"
const dotenv = require("dotenv");
const sql = require("mssql");
dotenv.config({
  path: "../config.env",
});

const dbConfig = require("./dbconfig");
const appPool = new sql.ConnectionPool(dbConfig.sqlConfig);

const fs = require("fs");
const ProductDAO = require("../DAO/ProductDAO");
const UserDAO = require("../DAO/UserAccount");
const FeatureDAO = require("../DAO/FeatureDAO");
const RatingDAO = require("../DAO/RatingDAO");
const CartDAO = require("../DAO/CartDAO");
async function importDB() {
  const PRODUCT_FILE_PATH = "../data/products.json";
  const USER_FILE_PATH = "../data/users.json";
  const FEATURE_FILE_PATH = "../data/feature.json";
  const RATING_FILE_PATH = "../data/rating.json";
  const CART_FILE_PATH = "../data/cart.json";
  const CARTPRODUCT_FILE_PATH = "../data/cartProduct.json";
  const SUBIMAGE_FILE_PATH = "../data/subImage.json";

  let products = JSON.parse(fs.readFileSync(PRODUCT_FILE_PATH, "utf-8"));
  let users = JSON.parse(fs.readFileSync(USER_FILE_PATH, "utf-8"));
  let features = JSON.parse(fs.readFileSync(FEATURE_FILE_PATH, "utf-8"));
  let ratings = JSON.parse(fs.readFileSync(RATING_FILE_PATH, "utf-8"));

  //import product
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    try {
      await ProductDAO.addProductIfNotExisted(product);
      console.log("import product --- done!");
    } catch (error) {
      console.log(product);
    }
  }
  //import users
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    try {
      await UserDAO.addUserIfNotExisted(user);
      console.log("import user --- done!");
    } catch (error) {
      console.log(user);
    }
  }
  // import feature
  for (let i = 0; i < features.length; i++) {
    let feature = features[i];
    try {
      await FeatureDAO.addFeatureIfNotExisted(feature);
      console.log("import feature --- done!");
    } catch (Error) {
      console.log(feature);
    }
  }

  // import rating

  for (let i = 0; i < ratings.length; i++) {
    console.log(i);
    let rating = ratings[i];
    try {
      await RatingDAO.addRatingIfNotExisted(rating);
      console.log("import rating --- done!");
    } catch (Error) {
      console.log(rating);
    }
  }
}

async function dbClean() {
  await FeatureDAO.clearAll();
  await ProductDAO.clearAll();
}

async function test() {
  let tourStarDates = await TourStartDateDAO.getByTourId(1);
  let tourImages = await TourImageDAO.getByTourId(1);

  console.log(tourStarDates);
  console.log(tourImages);
}

appPool
  .connect()
  .then(async function (pool) {
    dbConfig.db.pool = pool;
    console.log("SQL Connected!");

    if (process.argv[2] === "--clean") {
      console.log("cleaning db ...");
      await dbClean();
    } else if (process.argv[2] === "--import") {
      console.log("should import");
      await importDB();
    } else if (process.argv[2] === "--test") {
      await test();
    }
    console.log("done!!!");
  })
  .catch(function (err) {
    console.error("Error creating db connection pool", err);
  });

// console.log(process.argv);
