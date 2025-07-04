import express from "express";
import { Rental, validateRental } from "../models/rentals.js";
import { Customer } from "../models/customer.js";
import { Movie } from "../models/movies.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Rental.find().sort("-dateOut");
  res.send(result);
});
router.post("/", async (req, res) => {
  const error = validateRental(req.body);
  if (error) return res.status(400).send(error);
  const movie = await Movie.findById(req.body.movieId);
  const customer = await Customer.findById(req.body.customerId);

  if (!movie) return res.status(400).send("No movie exists with the given id");
  if (!customer)
    return res.status(400).send("No customer exists with the given id");
  if (movie.numberInStock === 0)
    return res.status(400).send("No movies present at this time");

  const rental = new Rental({
    movie: movie,
    customer: customer,
    dateOut: req.body.dateOut,
    ...(req.body.dateReturned && { dateReturned: req.body.dateReturned }),
    ...(req.body.rentalFee && { rentalFee: req.body.rentalFee }),
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await rental.save({ session });
    movie.numberInStock--;
    await movie.save({ session });
    await session.commitTransaction();
    res.send(rental);
  } catch (ex) {
    await session.abortTransaction();
    console.error(ex);
    res.status(500).send("Something failed... ", ex);
  } finally {
    session.endSession(); // ✅ always clean up!
  }
});
export default router;
