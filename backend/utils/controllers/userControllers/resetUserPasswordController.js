import UserModel from "../../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const resetUserPasswordController = async (req,res) => {
  const {token} = req.params;
  const {password} = req.body;

  try {

    if(!token || !password) {
      return res.status(400).json({message: 'Token and password are required.'})
    }

    const tokenUser = await jwt.verify(token, process.env.SECRET)

    if(!tokenUser) {
      return res.status(400).json({message: 'Invalid token.'})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const userData = await UserModel.findByIdAndUpdate(tokenUser._id, {password: hash}, {new: true})
    
    res.status(200).json({message: 'Password successfully updated'})
  } catch (err) {
    res.status(400).json({message: 'An error happened while resetting password!', error: err.message})
  }
}