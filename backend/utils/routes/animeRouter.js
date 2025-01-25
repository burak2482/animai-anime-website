import express from 'express'
import { getFeaturedAnimeList } from '../controllers/getFeaturedAnimeListController.js';
import { getCalendarController } from '../controllers/getCalendarController.js'
import { uploadCalendarPhoto, resizeCalendarPhoto, addCalendarController } from '../controllers/addCalendarController.js';
import { deleteCalendarController } from '../controllers/deleteCalendarController.js';
import { addFeaturedAnime, uploadFeaturedAnimePhoto, resizeFeaturedAnimePhoto } from '../controllers/addFeaturedAnimeController.js';
import { deleteFeaturedAnime } from '../controllers/deleteFeaturedAnime.js';
import { getAnimeVideoController } from '../controllers/getAnimeVideoController.js'
import { addAnimeVideoController} from '../controllers/addAnimeVideoController.js';
import { addAnimeHomePageController, resizeAnimeHomePagePhoto, uploadAnimeHomePagePhoto } from '../controllers/addAnimeHomePageController.js';
import { deleteAnimeVideoController } from '../controllers/deleteAnimeVideoController.js';
import { getAnimeHomePageController } from '../controllers/getAnimeHomePageController.js';
import { deleteAnimeHomePageController } from '../controllers/deleteAnimeHomePageController.js';
import { getApiAnimeHomePage } from '../controllers/getApiAnimeHomePageController.js';
import { getAnimeVideoPlayerController } from '../controllers/getAnimeVideoPlayerController.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import authenticateUser from '../../middleware/authenticateUser.js';
import { makeACommentToAnimeController } from '../controllers/addCommentToAnime.js';
import { getACommentInAnimeController } from '../controllers/getCommentInAnime.js';

const router = express.Router();

router.get('/get-featured-anime-list', getFeaturedAnimeList)

router.get('/get-calendar', getCalendarController)

router.get('/get-anime-video', getAnimeVideoController)

router.get('/get-anime-home-page', getAnimeHomePageController)

router.get('/api/get-anime-home-page/:id', getApiAnimeHomePage)

router.get('/get-anime-video-player/:id/:episodeNumber', getAnimeVideoPlayerController)

router.get('/get-comment-list-in-animelist/:animeId/:seasonNumber/:episodeNumber', getACommentInAnimeController)

router.post('/add-calendar', authenticateUser, checkAdmin, uploadCalendarPhoto, resizeCalendarPhoto, addCalendarController)

router.post('/add-featured-anime', authenticateUser, checkAdmin, uploadFeaturedAnimePhoto, resizeFeaturedAnimePhoto, addFeaturedAnime)

router.post('/add-anime-home-page', authenticateUser, checkAdmin, uploadAnimeHomePagePhoto, resizeAnimeHomePagePhoto, addAnimeHomePageController)

router.post('/add-anime-video/:id', authenticateUser, checkAdmin, addAnimeVideoController)

router.post('/make-a-comment', authenticateUser, makeACommentToAnimeController)

router.delete('/delete-calendar/:id', authenticateUser, checkAdmin, deleteCalendarController)

router.delete('/delete-anime-video/:id', authenticateUser, checkAdmin, deleteAnimeVideoController)

router.delete('/delete-anime-home-page/:id', authenticateUser, checkAdmin, deleteAnimeHomePageController)

router.delete('/delete-featured-anime/:id', authenticateUser, checkAdmin, deleteFeaturedAnime)

/*router.post('/upload-featured-anime-model')*/

export default router;