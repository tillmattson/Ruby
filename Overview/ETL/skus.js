const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Pool(DBCONFIG);

const run = () => {
  console.log("Loading Skus...");

  return client
    .query(`create index style_skus on skus(style_id);`)
    .then(() =>
      client.query(
        `COPY skus (id, style_id, size, quantity) FROM '${__dirname}/../dataFiles/skus.csv' delimiter ',' csv header;`
      )
    )
    .then(() => console.log("Skus Loaded\n"))
    .catch(console.error)
    .then(() => client.end());
};

module.exports = { run };
