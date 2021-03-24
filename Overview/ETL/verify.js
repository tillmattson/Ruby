const { exec } = require("child-process-promise");
const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const pool = new Pool(DBCONFIG);

let run = () => {
  console.log(`Starting data verification...\n\n`);
  exec(`wc -l dataFiles/features.csv`)
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on features.csv file.`)
    )
    .then(() => pool.query(`select count (*) from features;`))
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb features table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/photos.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on photos.csv file.`)
    )
    .then(() => pool.query(`select count (*) from photos;`))
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb photos table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/product.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on products.csv file.`)
    )
    .then(() => pool.query(`select count (*) from products;`))
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb products table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/related.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on related.csv file.`)
    )
    .then(() => pool.query(`select count (*) from related;`))
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb related table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/skus.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on skus.csv file.`)
    )
    .then(() => pool.query(`select count (*) from skus;`))
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb skus table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/styles.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on styles.csv file.`)
    )
    .then(() => pool.query(`select count (*) from styles;`))
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb styles table.\nVerification complete.\n`
      )
    )
    .catch(console.error)
    .then(() => pool.end());
};

module.exports = { run };
