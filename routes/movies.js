import express from "express";
import { Movie, validate } from "../models/movies.js";
import { Genre } from "../models/genre.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Movie.find();
  res.send(result);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("No genre exists with the given id");

  const movie = new Movie({
    title: req.body.title,
    genre: new Genre({ name: genre.name }),
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.send(movie);
});
//put a movie
router.put("/:id", async (req, res) => {
  //   const { error } = validateCust(req.body);
  //   if (error) return res.status(400).send(error);
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) return res.status(404).send("No such movie exist");
  res.send(movie);
});
// delete a customer
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send("No such movie exist");
  res.send(movie);
});
export default router;
