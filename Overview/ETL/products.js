const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Pool(DBCONFIG);

const run = () => {
  console.log(`Loading Products...`);
  return client
    .query(`create index products_id on products(id);`)
    .then(() =>
      client.query(
        `COPY products (id, name, slogan, description, category, default_price) FROM '${__dirname}/../dataFiles/product.csv' delimiter ',' csv header;`
      )
    )
    .then(() => console.log("Products Loaded\n"))
    .catch(console.error)
    .then(() => client.end());
};

module.exports = { run };
