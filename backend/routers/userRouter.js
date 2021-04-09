import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
  "/createadmin", 
  expressAsyncHandler (async (req, res) => {
    try {
      const user = new User({
        name: 'admin',
        email: 'admin@example.com',
        password: 'jsecommerce',
        isAdmin: true,
      })
      const createdUser = await user.save();
      res.send(createdUser)
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);

userRouter.post(
  "/signin", 
  expressAsyncHandler (async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if(!signinUser) {
      res.status(401).send({ message: "Invalid email or password" })
    } else {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        password: signinUser.password,
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser)
      })
    }
  })
)

export default userRouter;