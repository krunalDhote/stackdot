import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { router } from "./routes/routes.js";

const port = process.env.PORT || 3001;
const server = express();
server.use(express.json());
server.use("/", router);
// Database connection
const db_url = process.env.DB_URL ?? "";
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Connected to MongoDB:", db_url);
  })
  .catch((err) => console.log("DB Connection Error:", err));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
