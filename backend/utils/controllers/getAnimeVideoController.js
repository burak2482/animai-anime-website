import AnimeVideoModel from "../models/AnimeVideoModel.js";

export const getAnimeVideoController = async (req,res) => {
  try {
    const response = await AnimeVideoModel.find();
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json('An error happened while getting AnimeVideoModel', err)
  }
}