import config from "config";
import logger from "../middleware/logger.js";
export default function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("Fatal error: jwtPrivateKey is not defined. ");
  }
}
