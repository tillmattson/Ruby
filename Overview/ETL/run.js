const { Pool } = require("pg");
const { DBSCONFIG } = require("../config/config.js");
const schema = require("./schema.js");
const features = require("./features.js");
const photos = require("./photos.js");
const products = require("./products.js");
const related = require("./related.js");
const skus = require("./skus.js");
const styles = require("./styles.js");
const verify = require("./verify.js");

const create = new Pool(DBSCONFIG);
let start = Date.now();
console.log(`STARTING DATABASE LOAD...\n\n`);

create
  .query(`create database productdb;`)
  .then(() => console.log(`Created database: productdb \n`))
  .catch(console.error)
  .then(schema.run)
  .catch(console.error)
  .then(features.run)
  .catch(console.error)
  .then(photos.run)
  .catch(console.error)
  .then(products.run)
  .catch(console.error)
  .then(related.run)
  .catch(console.error)
  .then(skus.run)
  .catch(console.error)
  .then(styles.run)
  .catch(console.error)
  .then(() =>
    console.log(
      `\nDATABASE LOADED. \n(${Math.floor(
        (Date.now() - start) / 1000
      )} seconds)\n`
    )
  )
  .then(verify.run)
  .catch(console.error);
