const express = require("express");
const app = express();
const PORT = 8080;

app.get("/products", (req, res) => {
  res.send("Get products Working");
});

app.get("/products/*/$", (req, res) => {
  console.log(req.path);
  res.send("Get product Working");
});

app.get("/products/*/styles", (req, res) => {
  console.log(req.path);
  res.send("Get styles Working");
});

app.get("/products/*/related", (req, res) => {
  console.log(req.path);
  res.send("Get related Working");
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
