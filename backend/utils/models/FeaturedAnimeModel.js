import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  nameOfAnime: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  yearOfAnime: {
    type: String,
    required: true,
  },
  linkOfAnime: {
    type: String,
    required: true,
  },
});

const FeaturedAnimeModel = mongoose.model('anime', Schema)

export default FeaturedAnimeModel;