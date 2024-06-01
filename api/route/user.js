

import express from "express";
import { getDB } from "../db/db.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import { sha256 } from "js-sha256";
import { GenJWT } from "../util/jwt.js";
import CustomError from "./err.js";

const user = express.Router();

user.post("/login", paramCheck, async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await getDB().query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!user || user.password !== sha256(password))
      throw new CustomError(401, "Wrong username or password");
    res.json(GenJWT({ id: user.id }));
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

user.post("/register", paramCheck, async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await getDB().query.users.findFirst({
      where: eq(users.username, username),
    });
    if (user) throw new CustomError(401, "The username has been taken");
    const result = await getDB()
      .insert(users)
      .values({
        username: username,
        password: sha256(password),
      });
    const newId = result[0].insertId;
    res.json(GenJWT({ id: newId }));
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

function paramCheck(req, res, next) {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    username.length === 0 ||
    password.length === 0
  ) {
    res.status(400).json("Invalid request body");
    return;
  }
  next();
}

export default user;
