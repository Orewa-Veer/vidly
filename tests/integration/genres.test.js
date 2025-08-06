import request from "supertest";
import app from "../../app.js";
import { User } from "../../models/register.js";
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
  describe("Get/:id", () => {
    it("should return genre if correct id", async () => {
      const genre = await Genre.collection.insertOne({ name: "genre1" });
      const id = genre.insertedId;
      const res = await request(app).get(`/api/genres/${id}`);
      expect(res.status).toBe(200);
    });
    it("should return error if incorrect id", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/genres/${id}`);
      expect(res.status).toBe(404);
    });
  });
  describe("Post /", () => {
    it("should return 401 if the client is not logges in ", async () => {
      const res = await request(app)
        .post("/api/genres")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });
    it("should return 400 if genre is less than 5 chars", async () => {
      const token = new User().generateToken();
      const res = await request(app)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "gen" });
      expect(res.status).toBe(400);
    });
  });
});
