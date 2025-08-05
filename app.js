import routes from "./startup/routes.js";
import express from "express";
const app = express();
routes(app);
export default app;
