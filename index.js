import express from "express";
import logger from "./middleware/logger.js";
import Db from "./startup/Db.js";
import routes from "./startup/routes.js";
import configLogic from "./startup/configLogic.js";
configLogic();
Db();
const app = express();
routes(app);

const port = 3000;
app.listen(3000, () => logger.info(`Listening on port ${port}`));
