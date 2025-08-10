import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db.ts";
import cookieParser from "cookie-parser";
import authRoute from "./routes/user.ts";
const app = express();
connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running in Port ${process.env.PORT} `);
});
