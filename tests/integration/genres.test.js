import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/vidly_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

let server;
describe("/api/genres", () => {
  describe("Get/", () => {
    it("should return all genres", async () => {
      const res = await request(app).get("/api/genres");
      expect(res.status).toBe(200);
    }, 10000);
  });
});
