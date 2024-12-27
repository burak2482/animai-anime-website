import express from 'express'
import { getFeaturedAnimeList } from '../controllers/getFeaturedAnimeListController.js';
import { getCalendarController } from '../controllers/getCalendarController.js'
import { addCalendarController } from '../controllers/addCalendarController.js';

const router = express.Router();

router.get('/get-featured-anime-list', getFeaturedAnimeList)

router.get('/get-calendar', getCalendarController)

router.post('/add-calendar', addCalendarController)

/*router.post('/upload-featured-anime-model')*/

export default router;