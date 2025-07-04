import mongoose from "mongoose";
import Joi from "joi";
import { objectId } from "../extras/objectIdValidator.js";
import { movieSchhema } from "./movies.js";
import { customerScheme } from "./customer.js";
const rentalSchema = new mongoose.Schema({
  customer: { type: customerScheme, required: true },
  movie: { type: movieSchhema, required: true },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});
const Rental = mongoose.model("Rental", rentalSchema);
function validateRental(body) {
  const schema = Joi.object({
    customerId: objectId().required(),
    movieId: objectId().required(),
  });
  const { error } = schema.validate(body);
  return error;
}
export { Rental, validateRental };
