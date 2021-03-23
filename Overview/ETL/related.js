const { Client } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Client(DBCONFIG);

const run = () => {
  client
    .connect()
    .then(() => console.log("Loading Related..."))
    .catch((err) => console.error(err));

  client
    .query(`create index related_product on related(product_id);`)
    .catch(console.error);

  return client
    .query(
      `COPY related (id, product_id, related) FROM '${__dirname}/../dataFiles/related.csv' delimiter ',' csv header;`
    )
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
    .catch(console.error)
    .then(() => console.log("Related Loaded\n"));
};

module.exports = { run };
