import mongoose, { Schema } from "mongoose";

const AnimeSchema = new mongoose.Schema({
  animeName: {
    type: String,
    required: true,
  },
  animeEmbedCode: {
    type: String,
    required: true,
  },
  animeHomePageLink: {
    type: String,
    required: true,
  },
  animeEpisode: {
    type: String,
    required: true,
  },
})

const AnimeVideoModel = new mongoose.model('animeVideo', AnimeSchema )

export default AnimeVideoModel;