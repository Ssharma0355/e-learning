import express from "express";

const app = express();

const PORT = 2020;

app.get('/',(req,res)=>{
    res.send("Server is working fine")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});