const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, worlds!");
});

app.listen(8080);
