import config from "config";
import Joi from "joi";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, minlength: 5, maxlength: 255 },
  password: { type: String, minlength: 8, maxlength: 1024 },
  admin: { type: Boolean },
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, admin: this.admin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);
function validateUser(body) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  const { error } = schema.validate(body);
  return error;
}
export { User, validateUser };
