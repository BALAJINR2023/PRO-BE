import express from 'express';
import { userModel } from '../../DB/Models.js';// Adjust the import path as necessary

const usersRouter = express.Router();

usersRouter.put('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const userObj = await userModel.findOne({ email });

    if (userObj) {
      await userModel.updateOne({ email }, { $set: updateData });
      const updatedUser = await userModel.findOne({ email }, { __v: 0, _id: 0, password: 0 });
      res.send({ msg: 'User Updated Successfully', updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default usersRouter;