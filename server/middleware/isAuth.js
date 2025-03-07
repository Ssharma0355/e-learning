import jwt from "jsonwebtoken";
import {User} from "../models/user.js"

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
      messsage: "User is not logged In",
    });
  }
};
