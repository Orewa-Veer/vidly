import mongoose from "mongoose";
import { genreSchema } from "./genre.js";
import { objectId } from "../extras/objectIdValidator.js";
import Joi from "joi";
const movieSchhema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  genre: { type: genreSchema, required: true },

  numberInStock: { type: Number, required: true, min: 0, max: 250 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 250 },
});
function validate(body) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });
  const { value, error } = schema.validate(body);
  return { value, error };
}
const Movie = mongoose.model("Movie", movieSchhema);
export { Movie, movieSchhema, validate };
