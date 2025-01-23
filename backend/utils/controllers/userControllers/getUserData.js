import UserModel from "../../models/UserModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const getUserProfileData = async (req,res) => {

  const {token} = req.params;

  try {
    const user = await jwt.verify(token, process.env.SECRET)
    const userData = await UserModel.findOne({_id: user._id})

    if(!userData) {
      console.log('Kullanıcı bulunamadı.')
      return res.status(200).json(userData)
    }
    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json({message: 'User not found!'})
  }
}