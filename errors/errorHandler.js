const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const logger = require("../common/logging");

const handle = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = handle;
