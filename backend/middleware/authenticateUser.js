import jwt from 'jsonwebtoken'
import UserModel from '../utils/models/UserModel.js'

const authenticateUser = async (req,res,next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({message: 'Unauthorized access!'})
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = UserModel.findOne(decoded.id)

    console.log(decoded)

    if(!user) {
      throw new Error('User not found!')
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({message: 'Unauthorized access!'})
  }
}

export default authenticateUser;