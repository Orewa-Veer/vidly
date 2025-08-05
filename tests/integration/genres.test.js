import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import { Genre } from "../../models/genre.js";
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/vidly_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
afterEach(async () => {
  await Genre.deleteMany({});
});
describe("/api/genres", () => {
  describe("Get/", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      //
      const res = await request(app).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1"));
    });
  });
});
