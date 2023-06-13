require("express-async-errors");
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { StatusCodes } = require("http-status-codes");
const winston = require("./common/logging");
const errorHandler = require("./errors/errorHandler");

const heroRouter = require("./routes/heroes/hero.router");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

app.use(
  morgan(
    ":method :status :url size req :req[content-length] res :res[content-length] - :response-time ms",
    {
      stream: winston.stream
    }
  )
);

app.use("/heroes", heroRouter);

app.use((req, res, next) => next(createError(StatusCodes.NOT_FOUND)));

app.use(errorHandler);

module.exports = app;
