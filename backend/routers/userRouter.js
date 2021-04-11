import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
  "/createadmin", 
  expressAsyncHandler(async (req, res) => {
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
);

userRouter.post(
  "/register", 
  expressAsyncHandler (async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    const createdUser = await user.save();
    res.send(createdUser)
    if(!createdUser) {
      res.status(401).send({ message: "Invalid user data" })
    } else {
      res.send({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
      })
    }
  })
);

userRouter.put(
  "/:id", 
  expressAsyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id) 

    if(!user) {
      res.status(404).send({ message: "User not found" })
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
   
      const updatedUser = await user.save();

      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser)
      })
    }
  })
)


export default userRouter;