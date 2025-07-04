import Joi from "joi";
import mongoose from "mongoose";
import config from "config";
import movie from "./routes/movies.js";
import rental from "./routes/rentals.js";
import express from "express";
import customer from "./routes/customer.js";
import genres from "./routes/genres.js";
import register from "./routes/register.js";
import auth from "./routes/auth.js";
if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error: jwtPrivateKey is not defined. ");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Error connecting to MongoDB ", err));
const app = express();
app.use(express.json());
app.use("/api/rental", rental);
app.use("/api/genres", genres);
app.use("/api/customer", customer);
app.use("/api/movie", movie);
app.use("/api/register", register);
app.use("/api/auth", auth);

const port = 3000;
app.listen(3000, () => console.log(`Listening on port ${port}`));
