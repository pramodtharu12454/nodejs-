import express from "express";
import UserTable from "./schema.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import yup from "yup";
import {
  loginCredentialSchema,
  registerUserSchema,
} from "./user.validation.js";

const router = express.Router();

router.post(
  "/user/register",
  async (req, res, next) => {
    try {
      const validatedData = await registerUserSchema.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(402).send({ message: error.message });
    }
  },
  async (req, res) => {
    const newUser = req.body;

    //   find user , throw
    const user = await UserTable.findOne({ email: newUser.email });

    //  if user, throw error

    if (user) {
      return res.status(409).send({ message: "user already exists." });
    }
    // const userName = await UserTable.findOne({ name: newUser.name });
    // if (userName) {
    //   return res.status(409).send({ message: "username already exists." });
    // }

    // hash password
    //  requirement: plain password,saltround

    const plainPassword = newUser.password;
    const saltround = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltround);

    //   replace plain password with hashed password
    newUser.password = hashedPassword;

    // create user
    await UserTable.create(newUser);
    return res.status(201).send({ message: "registered...." });
  }
);

// ? login post
// ? midware
router.post(
  "/user/login",
  async (req, res, next) => {
    try {
      const validatedData = await loginCredentialSchema.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(402).send({ message: error.message });
    }
  },
  async (req, res) => {
    //  extract login crederntial from req.body
    const loginCredentials = req.body;

    // ? find user with provide email

    const user = await UserTable.findOne({ email: loginCredentials.email });

    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "invalid credentials." });
    }

    //  ? check for password match
    //  ? requirenment : plain password, hashed password

    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordmatch = await bcrypt.compare(plainPassword, hashedPassword);

    // if password not match

    if (!isPasswordmatch) {
      return res.status(404).send({ message: "invalid credentials." });
    }

    // generate token
    // payload => object inside token
    const payload = { email: user.email };
    const secretKey = "fs3rwfew4t35";
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "2d",
    });

    // ? remove password before sending to user

    user.password = undefined;

    return res.status(201).send({
      message: "login successful....",
      accessToken: token,
      userDetails: user,
    });
  }
);

export { router as userController };
