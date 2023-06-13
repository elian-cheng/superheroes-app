const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends AppError {
  constructor(entity, params, message) {
    super(message || `Couldn't find a ${entity} with: ${JSON.stringify(params)}`);
    this.status = StatusCodes.NOT_FOUND;
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

class EntityExistsError extends AppError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.EXPECTATION_FAILED;
  }
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  BAD_REQUEST_ERROR: BadRequestError,
  ENTITY_EXISTS: EntityExistsError
};
