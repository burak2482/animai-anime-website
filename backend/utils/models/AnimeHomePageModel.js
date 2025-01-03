import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  animeName: {
    type: String,
    required: true,
  },
  animeDescription: {
    type: String,
    required: true,
  },
  animeGenres: {
    type: Array,
    required: true,
  },
  animeYear: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
})

const AnimeHomePageModel = new mongoose.model('AnimeHomePageModel', Schema)