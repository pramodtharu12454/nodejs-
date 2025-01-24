import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserTable from "../user/schema.model.js";

export const isSeller = async (req, res, next) => {
  // extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // extract payload from token by decryption

  let payload = null;

  try {
    const secretKey = "fs3rwfew4t35";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find user using email from payload
  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "seller") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  next();
};

export const isUser = async (req, res, next) => {
  // extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // extract payload from token by decryption

  let payload = null;

  try {
    const secretKey = "fs3rwfew4t35";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find user using email from payload
  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  next();
};
