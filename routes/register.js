import bcrypt from "bcrypt";
import config from "config";
import express from "express";
import jwt from "jsonwebtoken";
import pick from "lodash.pick";
import { User, validateUser } from "../models/register.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).send("error is in validation", error);
  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user)
    return res
      .status(400)
      .send("User with this email or username already exists");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  //   console.log(user);
  const token = user.generateToken();
  res.header("x-auth-token", token).send(pick(user, ["_id", "name", "email"]));
});
export default router;
