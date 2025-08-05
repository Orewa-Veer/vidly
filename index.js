import app from "./app.js";
import logger from "./middleware/logger.js";
import Db from "./startup/Db.js";
import configLogic from "./startup/configLogic.js";
configLogic();
Db();

if (process.env.NODE_ENV !== "test") {
  const port = 3000;
  app.listen(port, () => logger.info(`Listening on port ${port}`));
}
