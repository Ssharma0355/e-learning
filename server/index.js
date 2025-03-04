import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js"
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();
//using middleware
app.use(express.json());

const port = process.env.PORT;


app.get('/',(req,res)=>{
res.send("Server is running")
})

app.use('/api',userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectDb();
});