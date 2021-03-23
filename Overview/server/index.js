const express = require("express");
const db = require(`../database/db.js`);
const app = express();
const PORT = 8080;

app.get("/products/", (req, res) => {
  db.getProducts(+req.query.page || 1, +req.query.count || 5)
    .then((data) => {
      if (data.length) {
        res.send(data);
      } else {
        res.status(404).send("Error: not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error: internal error");
    });
});

app.get("/products/:id", (req, res) => {
  db.getProductAtId(+req.params.id || 0)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("Error: not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error: internal error");
    });
});

app.get("/products/:id/styles", (req, res) => {
  db.getStyles(+req.params.id || 0)
    .then((data) => {
      if (data.length) {
        res.send({ product_id: +req.params.id, results: data });
      } else {
        res.status(404);
        res.send("Error: not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error: internal error");
    });
});

app.get("/products/:id/related", (req, res) => {
  db.getRelated(+req.params.id || 0)
    .then((data) => {
      if (data.length) {
        res.send(data);
      } else {
        res.status(404);
        res.send("Error: not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error: internal error");
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
