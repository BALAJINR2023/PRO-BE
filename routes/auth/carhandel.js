import express from 'express';
import multer from 'multer';
import path from 'path';
import { carModel } from '../../DB/Models.js'; // Adjust import as necessary

const carRoutes = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Handle POST request for car data and image upload
carRoutes.post('/', upload.single('carImage'), async (req, res) => {
  const { name, model, price, location, availability, carType, fuelType, transmissionType, dealerType, year } = req.body;
  try {
    const car = new carModel({
      name,
      model,
      price,
      location,
      availability,
      carType,
      fuelType,
      transmissionType,
      dealerType,
      year,
      image: req.file ? req.file.path : null, // Store the path of the uploaded image or null
    });

    await car.save();
    res.status(201).json({ message: "Car saved successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

carRoutes.get('/', async (req, res) => {
    try {
      const cars = await carModel.find(); // Fetch all cars
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default carRoutes;
