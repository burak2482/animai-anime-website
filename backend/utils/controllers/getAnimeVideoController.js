import AnimeHomePageModel from "../models/AnimeHomePageModel.js";

export const getAnimeVideoController = async (req,res) => {
  try {
    const response = await AnimeHomePageModel.find();
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json('An error happened while getting AnimeVideoModel', err)
  }
}