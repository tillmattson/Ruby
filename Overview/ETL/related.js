const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Pool(DBCONFIG);

const run = () => {
  console.log("Loading Related...");

  return client
    .query(`create index related_product on related(product_id);`)
    .then(() =>
      client.query(
        `COPY related (id, product_id, related) FROM '${__dirname}/../dataFiles/related.csv' delimiter ',' csv header;`
      )
    )
    .then(() => console.log("Related Loaded\n"))
    .catch(console.error)
    .then(() => client.end());
};

module.exports = { run };
