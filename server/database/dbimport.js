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
// const TourStartDateDAO = require("./../DAO/TourStartDateDAO");
// const TourDAO = require("./../DAO/TourDAO");
async function importDB() {
  const TOUR_FILE_PATH = '../data/products.json'
  let products = JSON.parse(fs.readFileSync(TOUR_FILE_PATH, "utf-8"));

  //import tour
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    // console.log(product);
try {
  await ProductDAO.addProductIfNotExisted(product);
} catch (error) {
  console.log(product.productId);
}
    // let tourDB = await TourDAO.getTourById(product.id);
    // console.log(tourDB);
    // if (!tourDB) {
    //   console.error(`cannot import tour with id ${product.id}`);
    //   continue;
    // }

    // if (tour.images) {
    //   for (let j = 0; j < tour.images.length; j++) {
    //     await TourImageDAO.addTourImageIfNotExisted(tour.id, tour.images[j]);
    //   }
    // }

    // if (tour.startDates) {
    //   for (let j = 0; j < tour.startDates.length; j++) {
    //     let date = new Date(tour.startDates[j]);
    //     await TourStartDateDAO.addTourStartDateIfNotExisted(
    //       tour.id,
    //       date.toISOString()
    //     );
    //   }
    // }
  }
}

async function dbClean() {
  await TourImageDAO.clearAll();
  await TourStartDateDAO.clearAll();
  await TourDAO.clearAll();
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
