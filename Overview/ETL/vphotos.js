const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const pool = new Pool(DBCONFIG);
let size = 100;

runLines = (i) => {
  if (i < size) {
    pool
      .query(`select * from photos order by id asc limit 1000000 offset ${i};`)
      .then(({ rows }) => {
        rows.forEach((row) => {
          if (
            !row.url.slice(0, 5) === "https" ||
            !row.thumbnail_url.slice(0, 5) === "https" ||
            row.url.length > 200
          ) {
            console.log(`Failed at id: ${i}`);
          }
        });
        i += 1000000;
        runLines(i);
      })
      .catch(console.error);
  } else {
    console.log("Complete.");
  }
};
pool
  .query(`select count(*) from photos;`)
  .then(({ rows }) => (size = rows[0].count))
  .catch(console.error)
  .then(() => runLines(0))
  .then(() => console.log(`Checking Photos...`));
