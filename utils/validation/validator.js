const { StatusCodes } = require("http-status-codes");

const errorResponse = errors => {
  return {
    status: "failed",
    errors: errors.map(err => {
      const { path, message } = err;
      return { path, message };
    })
  };
};

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      res
        .status(property === "body" ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.BAD_REQUEST)
        .json({ error: errorResponse(error.details) });
    } else {
      return next();
    }
  };
};

module.exports = { validator };
