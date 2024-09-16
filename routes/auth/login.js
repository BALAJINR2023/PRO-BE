import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../../DB/Models.js'; // Adjust path as needed

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { emailOrMobile, password } = req.body;

    try {
        // Find the user by email or mobile number
        const user = await userModel.findOne({ 
            $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name},
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expiration time
        );

        res.status(200).json({ message: 'Login successful', token, user:{name:user.name, email: user.email, mobile:user.mobile},});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

export default loginRouter;
