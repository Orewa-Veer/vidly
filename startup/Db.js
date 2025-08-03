import mongoose from "mongoose";
import logger from "../middleware/logger.js";
import config from "config";
export default function () {
  const db = config.get("db");
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}`));
}
