import express from "express";
import logger from "morgan";
import user from "./route/user.js";
import record from "./route/record.js";
import { initDB } from "./db/db.js";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

await initDB();
const app = express();
const swaggerDoc = YAML.load("./docs/swagger.yaml");

// json support
app.use(express.json());
// logger
app.use(logger("dev"));

app.use("/user", user);
app.use("/record", record);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
