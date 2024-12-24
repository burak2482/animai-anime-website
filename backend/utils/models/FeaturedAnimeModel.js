import mongoose from 'mongoose'

const Schema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
  type: {
    type: [String],
    required: true,
  }
  photo: {
    type: String,
    required: true,
  }
  year: {
    type: String,
    required: true,
  }
});

const FeaturedAnimeModel = mongoose.Model('anime', Schema)

export default AnimeModel;