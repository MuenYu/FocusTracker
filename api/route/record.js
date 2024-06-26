/**
 * record router
 * all API endpoints about focus history operations
 */

import express from "express";
import { DecodeJWT } from "../util/jwt.js";
import CustomError from "./err.js";
import { getDB } from "../db/db.js";
import { and, desc, eq } from "drizzle-orm";
import { records } from "../db/schema.js";

const record = express.Router();

/**
 * fetch records for user
 */
record.get("/", CheckCredential, async (req, res) => {
  try {
    const userId = req.userId;
    const list = await getDB().query.records.findMany({
      columns: {
        id: false,
        owner: false,
      },
      where: eq(records.owner, userId),
      orderBy: [desc(records.timestamp)],
    });
    res.json(list.map((item) => ({ ...item, sync: true })));
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

/**
 * add record to server
 */
record.post("/", CheckCredential, async (req, res) => {
  try {
    const userId = req.userId;
    const record = req.body;
    record.owner = userId;
    await getDB().insert(records).values(record);
    res.json("Upload success");
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

/**
 * update one record of user on server
 */
record.put("/", CheckCredential, async (req, res) => {
  try {
    const userId = req.userId;
    const record = req.body;
    if (Object.keys(record).length === 0)
      throw new CustomError(400, "Invalid request body");
    await getDB()
      .update(records)
      .set({ task: record.task })
      .where(
        and(eq(records.owner, userId), eq(records.timestamp, record.timestamp))
      );
    res.json("Update success");
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

/**
 * delete records
 */
record.delete("/", CheckCredential, async (req, res) => {
  try {
    const userId = req.userId;
    const record = req.body;
    if (Object.keys(record).length === 0)
      throw new CustomError(400, "Invalid request body");
    await getDB()
      .delete(records)
      .where(
        and(eq(records.owner, userId), eq(records.timestamp, record.timestamp))
      );
    res.json("Delete success");
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

/**
 * upload all unsync records on local device
 * if the record does not exist in database, then create it
 * if the record does exists in database, then update it
 */
record.post("/sync", CheckCredential, async (req, res) => {
  try {
    const userId = req.userId;
    const list = req.body;
    if (!Array.isArray(list))
      throw new CustomError(400, "Invalid request body");
    await getDB().transaction(async (tx) => {
      for (const r of list) {
        const record = await tx.query.records.findFirst({
          where: and(
            eq(records.timestamp, r.timestamp),
            eq(records.owner, userId)
          ),
        });
        if (record) {
          await tx
            .update(records)
            .set({ task: record.task })
            .where(eq(records.id, record.id));
        } else {
          record.owner = userId;
          await tx.insert(records).value(record);
        }
      }
    });
    res.json("Success");
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
});

/**
 * validate if the jwt token is valid
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function CheckCredential(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    // when no jwt token provided
    if (!authHeader) throw new CustomError(401, "No authentication token");
    const token = authHeader.split(" ")[1];
    const data = DecodeJWT(token);
    // when the signature of the token is not correct or expired
    if (data instanceof Error) throw new CustomError(401, `Invalid token: ${data.message}`);
    req.userId = data.id;
    next();
  } catch (error) {
    res.status(error.code ?? 500).json(error.message);
  }
}

export default record;
