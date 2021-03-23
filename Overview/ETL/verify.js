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
    .catch(console.error)
    .then(() => pool.query(`select count (*) from features;`))
    .catch(console.error)
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb features table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/photos.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on photos.csv file.`)
    )
    .catch(console.error)
    .then(() => pool.query(`select count (*) from photos;`))
    .catch(console.error)
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb photos table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/product.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on products.csv file.`)
    )
    .catch(console.error)
    .then(() => pool.query(`select count (*) from products;`))
    .catch(console.error)
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb products table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/related.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on related.csv file.`)
    )
    .catch(console.error)
    .then(() => pool.query(`select count (*) from related;`))
    .catch(console.error)
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb related table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/skus.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on skus.csv file.`)
    )
    .catch(console.error)
    .then(() => pool.query(`select count (*) from skus;`))
    .catch(console.error)
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb skus table.\n\n...loading next...\n`
      )
    )
    .then(() => exec(`wc -l dataFiles/styles.csv`))
    .then(({ stdout }) =>
      console.log(`${stdout.split(" ")[0]}: lines on styles.csv file.`)
    )
    .catch(console.error)
    .then(() => pool.query(`select count (*) from styles;`))
    .catch(console.error)
    .then(({ rows }) =>
      console.log(
        `${rows[0].count}: in productdb styles table.\nVerification complete.\n`
      )
    );
};

module.exports = { run };
