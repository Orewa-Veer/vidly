import jwt from "jsonwebtoken";
import config from "config";

function admin(req, res, next) {
  if (!req.user.admin) return res.status(403).send("Permission denied. ");
  next();
}
export default admin;
