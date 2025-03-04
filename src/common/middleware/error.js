import {
  badRequest,
  internalServerError,
  validationError,
} from "../exceptions/statusCodes";
import GeneralError from "../../common/exceptions/generalError";

const error = (error, req, res, next) => {
  if (error instanceof GeneralError) {
    return res.status(badRequest).json({
      success: false,
      status: badRequest,
      message: error.message,
    });
  }

  if (error && error.error && error.error.isJoi) {
    return res.status(validationError).json({
      success: false,
      status: validationError,
      message: error.error.details[0].message,
    });
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      message: error.message,
    });
  } else {
    return res.status(internalServerError).json({
      success: false,
      status: internalServerError,
      message: error.message,
    });
  }
};

module.exports = error;
