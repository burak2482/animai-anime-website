import express from 'express'
import { getFeaturedAnimeList } from '../controllers/getFeaturedAnimeListController';

const router = express.Router();

router.get('/get-featured-anime-list', getFeaturedAnimeList)

router.post('/upload-featured-anime-model')