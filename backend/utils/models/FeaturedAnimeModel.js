import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

const FeaturedAnimeModel = mongoose.model('anime', Schema)

export default FeaturedAnimeModel;