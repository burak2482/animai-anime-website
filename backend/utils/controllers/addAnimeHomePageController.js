import mongoose from 'mongoose'
import AnimeHomePageModel from '../models/AnimeHomePageModel.js';
import multer from 'multer'
import path from 'path'
import sharp from 'sharp';

const multerStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, '../frontend/public/animehomepagephotos')
  },
  filename: (req,file,cb) => {
   const ext = file.mimetype.split('/')[1]
   cb(null, `user-${Date.now()}.${ext}`);
  },
})

const multerFilter = (req,file,cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null,true)
  } else {
    cb(new Error('Please use an image file!'), false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

export const uploadAnimeHomePagePhoto = upload.single('photo');

export const resizeAnimeHomePagePhoto = async (req,res,next) => {
  if (!req.file) {
    return next();
  }

  req.file.name = `user-${Date.now()}.jpeg`;

  try {
    await sharp(req.file.path)
    .toFormat('jpeg')
    .toFile(`../frontend/public/animehomepagephotos/${req.file.name}`)
    next();
  } catch (err) {
    res.status(400).json({message: 'An error happened while sharping the image!', error: err.message})
  }
}

export const addAnimeHomePageController = async (req,res) => {
  const {animeName,selectedGenres,animeYear,animeDescription,animeTotalEpisode} = req.body;

  if (!animeName || !selectedGenres || !animeYear || !animeDescription || !animeTotalEpisode || !req.file) {
    return res.status(400).json('You need to fill all fields!')
  }

  try {
    const animeHomePageEvent = await AnimeHomePageModel.create({
      animeName,
      selectedGenres,
      animeYear,
      animeTotalEpisode,
      animeDescription,
      photo: req.file.name,
    })
    res.status(200).json(animeHomePageEvent)
  } catch (err) {
    res.status(400).json('An error happened while creating animeHomePageEvent', err)
  }
}