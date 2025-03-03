import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Server connected to MongoDB");
    }catch(error){
        console.log(error)

    }
}