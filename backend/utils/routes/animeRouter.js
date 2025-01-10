import express from 'express'
import { getFeaturedAnimeList } from '../controllers/getFeaturedAnimeListController.js';
import { getCalendarController } from '../controllers/getCalendarController.js'
import { uploadCalendarPhoto, resizeCalendarPhoto, addCalendarController } from '../controllers/addCalendarController.js';
import { deleteCalendarController } from '../controllers/deleteCalendarController.js';
import { addFeaturedAnime, uploadFeaturedAnimePhoto, resizeFeaturedAnimePhoto } from '../controllers/addFeaturedAnimeController.js';
import { deleteFeaturedAnime } from '../controllers/deleteFeaturedAnime.js';
import { getAnimeVideoController } from '../controllers/getAnimeVideoController.js'
import { addAnimeVideoController, addAnimeVideoImage, resizeAnimeVideoImage } from '../controllers/addAnimeVideoController.js';
import { addAnimeHomePageController, resizeAnimeHomePagePhoto, uploadAnimeHomePagePhoto } from '../controllers/addAnimeHomePageController.js';
import { deleteAnimeVideoController } from '../controllers/deleteAnimeVideoController.js';
import { getAnimeHomePageController } from '../controllers/getAnimeHomePageController.js';
import { deleteAnimeHomePageController } from '../controllers/deleteAnimeHomePageController.js';

const router = express.Router();

router.get('/get-featured-anime-list', getFeaturedAnimeList)

router.get('/get-calendar', getCalendarController)

router.get('/get-anime-video', getAnimeVideoController)

router.get('/get-anime-home-page', getAnimeHomePageController)

router.post('/add-calendar', uploadCalendarPhoto, resizeCalendarPhoto, addCalendarController)

router.post('/add-featured-anime', uploadFeaturedAnimePhoto, resizeFeaturedAnimePhoto, addFeaturedAnime)

router.post('/add-anime-home-page', uploadAnimeHomePagePhoto, resizeAnimeHomePagePhoto, addAnimeHomePageController)

router.post('/add-anime-video',addAnimeVideoImage, resizeAnimeVideoImage, addAnimeVideoController)

router.delete('/delete-calendar/:id', deleteCalendarController)

router.delete('/delete-anime-video/:id', deleteAnimeVideoController)

router.delete('/delete-anime-home-page/:id', deleteAnimeHomePageController)

router.delete('/delete-featured-anime/:id', deleteFeaturedAnime)

/*router.post('/upload-featured-anime-model')*/

export default router;