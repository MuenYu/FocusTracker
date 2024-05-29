import express from "express";
import user from "./route/user.js";
import record from "./route/record.js";
import { initDB } from "./db/db.js";

await initDB();
const app = express();
// support json parser
app.use(express.json());

app.use("/user", user);
app.use("/record", record);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
