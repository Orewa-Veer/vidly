import { User } from "../../../models/register";
import config from "config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
describe("user.generateAuthToken", () => {
  it("should return a valid jwt", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      admin: true,
    };
    const user = new User(payload);
    const token = user.generateToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
