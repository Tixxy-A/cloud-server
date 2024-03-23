import jwt from "jsonwebtoken";

import { AuthenticationError } from "../errors/index.js";

export const authUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    throw new AuthenticationError(
      "You are not logged in! Please log in to continue"
    );

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload._id };
  } catch (error) {
    console.log("Error at auth.js file ", error);
    throw new AuthenticationError("Authentication invalid");
  }

  next();
};
export const authProvider = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    throw new AuthenticationError(
      "You are not logged in! Please log in to continue"
    );

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.provider = { id: payload._id };
  } catch (error) {
    console.log("Error at auth.js file ", error);
    throw new AuthenticationError("Authentication invalid");
  }

  next();
};

export const authAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    throw new AuthenticationError(
      "You are not logged in! Please log in to continue"
    );

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = { id: payload._id };
  } catch (error) {
    console.log("Error at auth.js file ", error);
    throw new AuthenticationError("Authentication invalid");
  }

  next();
};
