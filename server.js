const logger = require("./common/logging");

process.on("unhandledRejection", reason => {
  process.emit("uncaughtException", reason);
});

const mongoose = require("mongoose");
const { PORT, MONGO_CONNECTION_STRING } = require("./common/config");
const app = require("./app");

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => logger.error("MongoDB connection error:")).once("open", () => {
  logger.info("Successfully connected to DB");
  app.listen(PORT, () => logger.info(`App is running on http://localhost:${PORT}`));
  logger.info("Type CTRL+C to stop the server");
  logger.info("GET /heroes/?page=${number} - get the list of heroes from the ${number} page");
  logger.info("POST /heroes - create new hero");
  logger.info("PUT /heroes/${id} - update hero by id");
  logger.info("DELETE /heroes/${id} - delete hero by id");
});
