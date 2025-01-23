import UserModel from "../../models/UserModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer, { diskStorage } from 'multer';

const multerStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, '../frontend/public/userprofilephotos')
  },
  filename: (req,file,cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${Date.now()}.${ext}`);
  },
})

const multerFilter = (req,file,cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only images are allowed!'), false);
  }
}

const upload = multer({
  storage: multerStorage,
  filter: multerFilter,
})

export const uploadUserProfilePicture = upload.single('photo')

export const changeUserProfilePicture = async (req,res) => {
  const {token} = req.params;


  if(!req.file) {
    return res.status(400).json({message: 'req.file is missing!'})
  }

  try {
    const jwtUser = await jwt.verify(token, process.env.SECRET)
    const actualUser = await UserModel.findByIdAndUpdate(
      jwtUser._id, 
      { photo: `/userprofilephotos/${req.file.filename}` },
      { new: true }
    );
    console.log(req.file.filename);
    res.status(200).json(actualUser)
  } catch (err) {
    res.status(400).json({message: 'An error happened while updating users photo', error: err})
  }
}