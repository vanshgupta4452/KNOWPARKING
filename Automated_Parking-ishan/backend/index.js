import express from "express";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from "cors";
import cookieParser from 'cookie-parser';
import bcrypt from "bcryptjs"; // Import bcrypt module

import { PORT, mongoDBURL } from "./config.js";
import { User } from './models/user.js';
import { Review } from "./models/tinfo.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const jwtAuth = (req, res, next) => {
  const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDY3OGE4MGJkYWYyZDk1M2I0NzIyZSIsImlhdCI6MTcxMTgwMTk3MiwiZXhwIjoxNzExODA5MTcyfQ.kDtJgMXFpPFln5FrpSjH_4P3sd5KXMnHxMNF7KTImaE";

  if (!hardcodedToken) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(hardcodedToken, 'shhhh');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Define the schema for parking information
const parkingInfoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Date, default: Date.now },
  parkingname: { type: String, required: true },
  parkingspot: { type: String, required: true } // New field for parking spot
});


// Create a model based on the schema
const ParkingInfo = mongoose.model('ParkingInfo', parkingInfoSchema);

// API endpoint to store parking information
app.post("/api/store-parking-info", jwtAuth, async (req, res) => {
  try {
    const { parkingspot } = req.body; // Get the selected parking spot from request body

    const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDY3OGE4MGJkYWYyZDk1M2I0NzIyZSIsImlhdCI6MTcxMTgwMTk3MiwiZXhwIjoxNzExODA5MTcyfQ.kDtJgMXFpPFln5FrpSjH_4P3sd5KXMnHxMNF7KTImaE";

    const decoded = jwt.verify(hardcodedToken, 'shhhh');
    const { id: userId } = decoded;

    // Fetch the username and email from the User model using userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username: userUsername, email: userEmail } = user;

    const parkingname = "metro station"; // Assuming "metro station" as parkingname

    // Create a new parking info entry
    const newParkingInfo = new ParkingInfo({
      username: userUsername,
      email: userEmail, // Use userEmail fetched from User model
      parkingname: parkingname,
      parkingspot: parkingspot // Include selected parking spot
    });

    // Save the entry to the database
    await newParkingInfo.save();

    res.status(201).json({ message: "Parking information stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// API endpoint to retrieve all parking information
app.get("/api/get-parking-info", jwtAuth, async (req, res) => {
  try {
    // Decoded JWT should already be available in the req object from jwtAuth middleware
    const { userId } = req;

    // Fetch the username from the User model using userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming the user's email is unique for identification
    const userEmail = user.email;

    // Fetch the latest parking information for the user's email
    const latestParkingInfo = await ParkingInfo.findOne({ email: userEmail })
      .sort({ time: -1 }) // Sort by 'time' in descending order to get the latest
      .lean(); // Use lean() for better performance if you don't need mongoose doc methods

    res.status(200).json({ parkingInfo: latestParkingInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "Send all the data" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      'shhhh',
      {
        expiresIn: "2h"
      }
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
      httpOnly: true, 
    };

    res.cookie("token", token, options);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/auth/register", async (req,res) => {
  try {
      const {username, email, password} = req.body

      if (!req.body.username || !req.body.email || !req.body.password) {
          return res.status(400).json({ message: "Please insert all information!" });
      } else {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              return res.status(400).json({ message: "User already exists" });
          }
      }
      

      const myEncPassword =await bcrypt.hash(password,10)

      const user = await User.create({
          username,
          email,
          password: myEncPassword
      })

      const token = jwt.sign(
          {id: user._id,email},
          'shhhh',
          {
              expiresIn: "2h"
          }
      );

      user.token = token

      user.password = undefined
      res.status(201).json({ message: "User has been created!" });

  } catch (error){
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
})

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
