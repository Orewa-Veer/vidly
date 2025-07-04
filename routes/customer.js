import { Customer, validateCust } from "../models/customer.js";
import express from "express";
import Joi from "joi";
const router = express.Router();

//get customer list
router.get("/", async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});
// post a customer
router.post("/", async (req, res) => {
  const { error } = validateCust(req.body);
  if (error) return res.status(400).send(error);
  let genre = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  genre = await genre.save();
  res.send(genre);
});
//put a customer
router.put("/:id", async (req, res) => {
  const { error } = validateCust(req.body);
  if (error) return res.status(400).send(error);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("No such customer exist");
  res.send(customer);
});
// delete a customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("No such customer exist");
  res.send(customer);
});

export default router;
