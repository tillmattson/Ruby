const { Client } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Client(DBCONFIG);

const run = () => {
  client
    .connect()
    .then(() => console.log("Loading Products..."))
    .catch((err) => console.error(err));

  client
    .query(`create index products_id on products(id);`)
    .catch(console.error);
  return client
    .query(
      `COPY products (id, name, slogan, description, category, default_price) FROM '${__dirname}/../dataFiles/product.csv' delimiter ',' csv header;`
    )
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
    .catch(console.error)
    .then(() => console.log("Products Loaded\n"));
};

module.exports = { run };
