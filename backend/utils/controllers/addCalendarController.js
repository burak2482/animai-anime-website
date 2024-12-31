import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import CalendarModel from '../models/CalendarAnimeModel.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/calendarphotos');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload an image file!'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadCalendarPhoto = upload.single('photo');

export const resizeCalendarPhoto = async (req, res, next) => {
  if (!req.file) return next();

  console.log('File:', req.file);

  req.file.name = `user-${Date.now()}.jpeg`;

  try {
    await sharp(req.file.path)
      .toFormat('jpeg')
      .toFile(`../frontend/public/calendarphotos/${req.file.name}`);
    next();
  } catch (error) {
    res.status(500).json({
      error: 'An Error happened while sharping the photo',
      details: error.message,
    });
  }
};

export const addCalendarController = async (req, res) => {
  const { animeName, episodeOfAnime, animeSeriesLink, hourOfRelease, selectedDays } = req.body;

  if (!animeName || !episodeOfAnime || !hourOfRelease || !animeSeriesLink || !req.file || !selectedDays) {
    console.log('Eksik alanlar:', { animeName, episodeOfAnime, animeSeriesLink, selectedDays });
    return res.status(400).json({ error: 'Please fill all fields.' });
  }

  try {
    const calendarAnime = await CalendarModel.create({
      animeName,
      episodeOfAnime,
      hourOfRelease,
      animeSeriesLink,
      selectedDays,
      photo: req.file.name,
    });
    res.status(201).json(calendarAnime);
  } catch (err) {
    console.error('An error happened while creating Calendar day.:', err.message);
    res
      .status(500)
      .json({ message: 'An error happened while creating Calendar day.' });
  }
};
