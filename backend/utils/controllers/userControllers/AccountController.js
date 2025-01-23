import UserModel from '../../models/UserModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const createToken = async (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
}

export const signUpController = async (req,res) => {

  const {email,password,nickname} = req.body;

  try {
    const user = await UserModel.signup(email,password,nickname);
    
    const token = await createToken(user._id)

    res.status(200).json({email, token})
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: 'An error happened while signing up!', error: err})
  }
}

export const logInController = async (req,res) => {
  const {email,password} = req.body;

  try {
    const user = await UserModel.login(email,password)

    const token = await createToken(user._id)

    console.log('User ID:', user._id);
    console.log('Token:', token);

    res.status(200).json({email, token})
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: 'An error happened while login', error: err})
  }
}