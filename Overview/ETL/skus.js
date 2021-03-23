const { Client } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Client(DBCONFIG);

const run = () => {
  client
    .connect()
    .then(() => console.log("Loading Skus..."))
    .catch((err) => console.error(err));

  client
    .query(`create index style_skus on skus(style_id);`)
    .catch((err) => console.error(err));

  return client
    .query(
      `COPY skus (id, style_id, size, quantity) FROM '${__dirname}/../dataFiles/skus.csv' delimiter ',' csv header;`
    )
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
    .catch(console.error)
    .then(() => console.log("Skus Loaded\n"));
};

module.exports = { run };
