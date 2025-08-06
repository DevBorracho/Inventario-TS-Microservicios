import express from "express";
import "dotenv/config";
import connectDb from "./config/db.ts";

const app = express();
connectDb();
app.use(express.json());
app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running in Port ${process.env.PORT} `);
});
