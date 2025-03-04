import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if the user already exists with case-insensitive email check
    let user = await User.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the user object (not saved yet)
    user = new User({
      name,
      email,
      password: hashPassword, // Store hashed password
    });

    // Save the user to the database
    await user.save();

    // Generate OTP (6 digits)
    const otp = Math.floor(Math.random() * 1000000);

    // Create JWT token with OTP, with expiration of 5 minutes
    const activationToken = jwt.sign(
      { userId: user._id, email: user.email, otp },
      process.env.Activation_Secret,
      { expiresIn: "5m" }
    );

    // Data to send in the email
    const data = {
      name: user.name,
      otp,
    };

    // Sending OTP email
    await sendMail(user.email, "E-Learning OTP Verification", data);

    // Respond with a success message and the user's name
    res.status(200).json({
      message: `User ${user.name} added successfully! OTP has been sent to your email address.`,
      activationToken,
    });
  } catch (error) {
    // Log error and send proper message
    console.error(error);
    res.status(500).json({
      message: "Server error: " + error.message,
    });
  }
};

export default register;
