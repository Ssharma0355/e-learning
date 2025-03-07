import jwt from "jsonwebtoken";
import {User} from "../models/user.js"
import { TryCatch } from "./TryCatch.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res.status(403).json({
        message: "Please log in",
      });
    const decodedData = jwt.verify(token, process.env.Jwt_Secret);
    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: "User is not logged In",
    });
  }
};

export const isAdmin = TryCatch(async(res,req,next)=>{
  try {
    if(req.user.role !== "admin") return res.status(403).json({
      message:"You are not admin"

    })
    next();
    
  } catch (error) {
     res.status(500).json({
       message: error.message,
     });

    
  }

})