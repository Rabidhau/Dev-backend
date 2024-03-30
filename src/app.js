const express = require("express");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const app = express();

const jobRoute = require("./routes/job");

// middleware
app.use(express.json());

app.use("/", jobRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(8080);
