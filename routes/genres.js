import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import asyncMiddleware from "../middleware/async.js";
import Joi from "joi";
import { Genre, validateGen } from "../models/genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Genre.find();
  res.send(result);
});
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("No such genre exists");
  res.send(genre);
});
// to add genres
router.post("/", [auth, admin], async (req, res) => {
  const result = new Genre(req.body);
  await result.save();
  res.send(result);
});
// to update genres
router.put("/:id", async (req, res) => {
  const { value, error } = validateGen(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("No such genre exists");

  genre.name = req.body.name;
  res.send(genre);
});
// to delete genres
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("No such genre exists");

  res.send(genre);
});

async function createGenre(body) {
  const genre = new Genre({
    name: body,
  });
  const result = await genre.save();
  return result;
}
export default router;
