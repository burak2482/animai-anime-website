import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import FeaturedAnimeModel from '../models/FeaturedAnimeModel.js'

const multerStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, '../frontend/public/featuredanimephotos');
  },
  filename: (req,file,cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${Date.now()}.${ext}`);
  }
})

const multerFilter = (req,file,cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Please upload an image file!'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadFeaturedAnimePhoto = upload.single('photo');

export const resizeFeaturedAnimePhoto = async (req,res,next) => {
  if(!req.file) return next();

  req.file.name = `user-${Date.now()}.jpeg`;

  try {
    await sharp(req.file.path)
    .toFormat('jpeg')
    .toFile(`../frontend/public/featuredanimephotos/${req.file.name}`)
    next();
  } catch (error) {
    res.status(500).json({error: 'An error happened while creating featured anime', details: error.message });
  }
};

export const addFeaturedAnime = async (req,res) => {
  const {yearOfAnime, linkOfAnime, nameOfAnime} = req.body;

  if(!yearOfAnime || !linkOfAnime || !nameOfAnime || !req.file ) {
    return res.status(400).json({error: 'Please fill all fields '})
  }

  try {
    const featuredAnime = await FeaturedAnimeModel.create({
      yearOfAnime,
      linkOfAnime,
      nameOfAnime,
      photo: req.file.name,
    })
    res.status(200).json(featuredAnime)
  } catch (error) {
    console.error('An error happened while creating Featured anime.:', err.message);
    res.status(400).json({message: 'An error happened while creating Featured anime' })
  }
}
