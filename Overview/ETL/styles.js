const { Client } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Client(DBCONFIG);

const run = () => {
  client
    .connect()
    .then(() => console.log("Loading Styles..."))
    .catch((err) => console.error(err));

  client
    .query(`create index style_product on styles(product_id)`)
    .catch(console.error);

  return client
    .query(
      `COPY styles (style_id, product_id, name, sale_price, original_price, default_style) FROM '${__dirname}/../dataFiles/styles.csv' with delimiter ',' csv header null as 'null';`
    )
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
    .catch(console.error)
    .then(() => console.log("Styles Loaded\n"));
};
module.exports = { run };
