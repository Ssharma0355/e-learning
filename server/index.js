import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Server is working fine")
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectDb();
});