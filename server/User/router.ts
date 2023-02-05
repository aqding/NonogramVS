import UserModel from "./model";
import express from "express";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { useReducer } from "react";

const router = express.Router();

/**
 * Get the current session.
 *
 * @name GET /api/user/session
 *
 * @return the user if they are logged in, otherwise null
 */
router.get("/session", async (req: Request, res: Response) => {
  if (!req.session.userId)
    res.status(200).json({
      message: "You are not logged in",
      user: null,
    });
  else {
    const user = await UserModel.findById(req.session.userId);
    res.status(200).json({
      message: "Successfully retrieved user information from session",
      user: user,
    });
  }
});

/**
 * Create a new user. Password is stored as a salted hash
 * in the database. This sets the session with the created
 * user.
 *
 * @name POST /api/user/create
 *
 * @param {string} username - the username of the account
 * @param {string} password - the password of the account
 *
 * @return the user that was created
 */
router.post("/create", async (req: Request, res: Response) => {
  const plaintextPass = req.body.password;
  const saltRounds = 5;
  bcrypt.hash(plaintextPass, saltRounds).then(async (hash) => {
    const user = new UserModel({ username: req.body.username, password: hash });
    await user.save();
    req.session.userId = user._id.toString();
    res.status(200).json({
      message: `Successfully created user with username ${user.username}`,
      user: user,
    });
  });
});

/**
 * Login with a username and password. Sets the session
 * with the user if login is successful.
 *
 * @name POST /api/user/login
 *
 * @param {string} username - the username of the account
 * @param {string} password - the password of the account
 *
 * @throws {404} - if a user with the given username is not found
 * @throws {400} - if the password is incorrect
 *
 * @return the user that was created
 *
 */
router.post("/login", async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).json({
      error: "Unable to find user",
    });
  } else {
    const hashedPass = user.password;
    bcrypt.compare(req.body.password, hashedPass).then((result) => {
      if (result) {
        req.session.userId = user._id.toString();
        res.status(200).json({
          message: "Successfully logged in!",
        });
      } else res.status(400).json({ error: "Incorrect password" });
    });
  }
});

export default router;
