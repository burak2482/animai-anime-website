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
  animeTotalEpisode: {
    type: String,
    required: true,
  },
  animeEpisodes: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      seasonNumber: {
        type: String,
        required: true,
      },
      episodeNumber: {
        type: String,
        required: true,
      },
      episodeTitle: {
        type: String,
        required: true,
      },
      embedLink: {
        type: String,
        required: true,
      },
    },
  ],
  selectedGenres: {
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

export default AnimeHomePageModel