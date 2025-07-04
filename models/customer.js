import mongoose from "mongoose";
import Joi from "joi";
const customerScheme = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  phone: { type: String, minlength: 5, maxlength: 50, required: true },
});
const Customer = mongoose.model("Customer", customerScheme);
function validateCust(body) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  });
  const { value, error } = schema.validate(body);
  return { value, error };
}
export { Customer, customerScheme, validateCust };
