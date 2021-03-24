const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Pool(DBCONFIG);

const run = () => {
  console.log("Loading Styles...");

  return client
    .query(`create index style_product on styles(product_id)`)
    .then(() =>
      client.query(
        `COPY styles (style_id, product_id, name, sale_price, original_price, default_style) FROM '${__dirname}/../dataFiles/styles.csv' with delimiter ',' csv header null as 'null';`
      )
    )
    .then(() => console.log("Styles Loaded\n"))
    .catch(console.error)
    .then(() => client.end());
};
module.exports = { run };
