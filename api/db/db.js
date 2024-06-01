/**
 * generate DB util file
 * configure the database connection pool and maintain the global db connection object
 */

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

/**
 * the database conenction configuration, read from env file
 */
const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// the global database object
let db = null;

// inital the database connection, keep the db object using singleton design pattern
async function initDB() {
  if (!db) {
    try {
      db = drizzle(await poolConnection.getConnection(), {
        schema,
        mode: "default",
      });
      console.log("Database initialized successfully.");
    } catch (e) {
      console.error(`Error initializing database: ${e}`);
      throw new Error(`Error initializing database: ${e}`);
    }
  } else {
    console.log("Database is already initialized.");
  }
}

// expose the db object, using singleton design pattern
function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call initDb first.");
  }
  return db;
}

export { initDB, getDB };
