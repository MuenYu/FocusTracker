import express from "express";
import { getDB } from "../db/db.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import { sha256 } from "js-sha256";
import { GenJWT } from "../util/jwt.js";

const user = express.Router();

user.post("/login", paramCheck, async (req, res) => {
  const { username, password } = req.body;
  let user = await getDB().query.users.findFirst({
    where: eq(users.username, username),
  });
  if (user && user.password === sha256(password)) {
    res.json(GenJWT({ id: user.id }));
    return;
  }
  res.status(401).json("Wrong username or password");
});

user.post("/register", paramCheck, async (req, res) => {
  const { username, password } = req.body;
  let user = await getDB().query.users.findFirst({
    where: eq(users.username, username),
  });
  if (!user) {
    const result = await getDB()
      .insert(users)
      .values({
        username: username,
        password: sha256(password),
      });
    const newId = result[0].insertId;
    res.json(GenJWT({ id: newId }));
    return;
  }
  res.status(401).json("The username has been taken");
});

function paramCheck(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("Invalid request body");
    return;
  }
  next();
}

export default user;
