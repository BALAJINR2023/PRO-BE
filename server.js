import express from 'express';
import jwt from "jsonwebtoken";
import cors from 'cors';
import MongooseconnectDB from './DB/Mongoose.js';
import connectDB from './DB/Mongo.js';
import registerRouter from './routes/auth/register.js';
import loginRouter from './routes/auth/login.js';
import forgotPasswordRouter from './routes/auth/forgotpass.js';
import resetPasswordRouter from './routes/auth/reset.js';
import usersRouter from './routes/auth/updateuse.js';
import carRoutes from './routes/auth/carhandel.js';

const server = express();

server.use(express.json());
server.use(cors());

await connectDB();
await MongooseconnectDB();
const customMiddleware = (req, res, next) => {
    console.log(
      new Date().toString(),
      "Handling request for",
      req.method,
      req.originalUrl
    );
  
    next();
  };
 
server.use(customMiddleware);
const authAllApi = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err.message);
    // err
    res.status(403).send({ msg: "Unauthorized" });
  }
};

server.use('/register', registerRouter);
server.use('/login', loginRouter);
server.use('/forgot-password', forgotPasswordRouter);
server.use('/reset-password', resetPasswordRouter);
server.use("/users", authAllApi, usersRouter);
server.use('/cars', carRoutes);

const port = 8000;
server.listen(port, ()=>{
    console.log(Date().toString(),`Server is running on port ${port}`);
});