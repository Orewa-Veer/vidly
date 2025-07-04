import express from "express";
import config from "config";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";
import pick from "lodash.pick";
import { User } from "../models/register.js";
import { runInNewContext } from "vm";
const router = express.Router();

router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password ");
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword)
    return res.status(400).send("Invalid email or password ");
  const token = user.generateToken();
  res.send(token);
});
function validate(body) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  const { error } = schema.validate(body);
  return error;
}
export default router;
