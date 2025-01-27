import AnimeHomePageModel from '../models/AnimeHomePageModel.js'
import multer from 'multer'
import sharp from 'sharp'
import mongoose from 'mongoose'
import path from 'path'

/*const multerStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, '../frontend/public/animevideophotos')
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
    cb(new Error('An error happened while multering the image file!'), false)
  }
}

const upload = multer({
  destination: multerStorage,
  fileFilter: multerFilter,
})

export const addAnimeVideoImage = upload.single('photo')

export const resizeAnimeVideoImage = async (req,res,next) => {
  if(!req.file) {
    return next();
  }

  req.file.name = `user-${Date.now()}.jpeg`;

  try {
    await sharp(req.file.path)
    .toFormat('jpeg')
    .toFile(`../frontend/public/animevideophotos/${req.file.name}`)
    next();
  } catch (err) {
    res.status(400).json('An error happened while sharping the image file!', err)
  }
}

*/


export const addAnimeVideoController = async (req,res) => {
  const {episodeNumber, episodeTitle, seasonNumber, embedLink} = req.body;

  const {id} = req.params;


  if(!episodeNumber || !episodeTitle || !embedLink) {
    return res.status(400).json('Please fill the all fields!')
  }

  try {
    const updatedAnime = await AnimeHomePageModel.findByIdAndUpdate(
      id,
      {
        $push: {
          animeEpisodes: { seasonNumber, episodeNumber, episodeTitle, embedLink },
        },
      },
      { new: true, runValidators: true }
    );

    if(!updatedAnime) {
      return res.status(404).json("Can't find the anime!.")
    }

    res.status(200).json(updatedAnime)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'An error happened while creating AnimeVideoModel', error })
  }
}