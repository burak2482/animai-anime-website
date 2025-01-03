import express from 'express'
import { getFeaturedAnimeList } from '../controllers/getFeaturedAnimeListController.js';
import { getCalendarController } from '../controllers/getCalendarController.js'
import { uploadCalendarPhoto, resizeCalendarPhoto, addCalendarController } from '../controllers/addCalendarController.js';
import { deleteCalendarController } from '../controllers/deleteCalendarController.js';
import { addFeaturedAnime, uploadFeaturedAnimePhoto, resizeFeaturedAnimePhoto } from '../controllers/addFeaturedAnimeController.js';
import { deleteFeaturedAnime } from '../controllers/deleteFeaturedAnime.js';
import { getAnimeVideoController } from '../controllers/getAnimeVideoController.js'
import { addAnimeVideoController } from '../controllers/addAnimeVideoController.js';

const router = express.Router();

router.get('/get-featured-anime-list', getFeaturedAnimeList)

router.get('/get-calendar', getCalendarController)

router.get('/get-anime-video', getAnimeVideoController)

router.post('/add-calendar', uploadCalendarPhoto, resizeCalendarPhoto, addCalendarController)

router.post('/add-featured-anime', uploadFeaturedAnimePhoto, resizeFeaturedAnimePhoto, addFeaturedAnime)

router.post('/add-anime-video', addAnimeVideoController)

router.delete('/delete-calendar/:id', deleteCalendarController)

router.delete('/delete-featured-anime/:id', deleteFeaturedAnime)

/*router.post('/upload-featured-anime-model')*/

export default router;