import mongoose from "mongoose";
const genreSchema = new mongoose.Schema({
  name: String,
});
const Genre = mongoose.model("Genre", genreSchema);
const validateGen = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { value, error } = schema.validate(body);
  return { value, error };
};
export { Genre, genreSchema, validateGen };
