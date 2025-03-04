import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js"
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use('/api',userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectDb();
});