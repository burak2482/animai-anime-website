import mongoose, { Schema } from "mongoose";
import AnimeHomePageModel from "./AnimeHomePageModel.js";
import UserModel from "./UserModel.js";

const AnimeSchema = new mongoose.Schema({
  animeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: AnimeHomePageModel,
    required: true,
  },
  episodeNumber: {
    type: String,
    required: true,
  },
  seasonNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
})

const AnimeCommentModel = new mongoose.model('animeComment', AnimeSchema )

export default AnimeCommentModel;