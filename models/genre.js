import mongoose from "mongoose";
const genreSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
});
const Genre = mongoose.model("Genre", genreSchema);
const validateGen = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  const { value, error } = schema.validate(body);
  return { value, error };
};
export { Genre, genreSchema, validateGen };
