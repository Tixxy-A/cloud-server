import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

class AuthenticationError extends CustomError {
  constructor(messsage) {
    super(messsage);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthenticationError;
