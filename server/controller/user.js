import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const register = async (req,res)=>{
    try{
      const {email,name,password} =req.body

      let user = await User.findOne({email})
      if(user)
        return res.status(400).json({
          message: "User Already exist",
        });

        const hashPassword = await bcrypt.hash(password, 10); //hasing password passwod,salt

          user = {
            name,
            email,
            password: hashPassword, //sending hashedpassword in database
          };

          //generating otp

          const otp = Math.floor(Math.random()* 1000000) //generating 6 digits otp

          const activationToken = jwt.sign({
            user,
            otp
          }, process.env.Activation_Secret,{
            expiresIn:"5m"
          })

          const data ={
            name,otp
          }
      
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}
export default register
