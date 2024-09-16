import express from 'express';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { userModel } from '../../DB/Models.js';
import { nanoid } from 'nanoid';
const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
    const userData = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
      
        const newUser = new userModel({
            ...userData,
            id: nanoid(), // Generate a unique ID for the user
            password: hashedPassword,
            isVerified: false
        });

        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: "User saved successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

export default registerRouter;
