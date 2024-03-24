const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("JobJenie");
});

app.listen(8080);
