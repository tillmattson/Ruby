const { Client } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Client(DBCONFIG);

const run = () => {
  client
    .connect()
    .then(() => console.log("Loading Photos..."))
    .catch((err) => console.error(err));

  client
    .query(
      `COPY photos (id, style_id, url, thumbnail_url) FROM '${__dirname}/../dataFiles/photos.csv' delimiter ',' csv header ;`
    )
    .catch((e) => console.error(e.stack));

  client
    .query(`ALTER table photos drop column id;`)
    .catch((e) => console.error(e.stack));

  client
    .query(`create index style_photos on photos(style_id);`)
    .catch((e) => console.error(e.stack));

  return client
    .query(`alter table photos rename column did to id`)
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
    .catch(console.error)
    .then(() => console.log("Photos Loaded\n"));
};
module.exports = { run };
