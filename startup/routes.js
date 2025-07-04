import express from "express";
import error from "../middleware/error.js";
import auth from "../routes/auth.js";
import customer from "../routes/customer.js";
import genres from "../routes/genres.js";
import movie from "../routes/movies.js";
import register from "../routes/register.js";
import rental from "../routes/rentals.js";
export default function (app) {
  app.use(express.json());
  app.use("/api/rental", rental);
  app.use("/api/genres", genres);
  app.use("/api/customer", customer);
  app.use("/api/movie", movie);
  app.use("/api/register", register);
  app.use("/api/auth", auth);
  app.use(error);
}
