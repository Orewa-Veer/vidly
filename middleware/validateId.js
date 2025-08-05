import mongoose from "mongoose";
export function validateId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Invalid Id" });
  }
  next();
}
