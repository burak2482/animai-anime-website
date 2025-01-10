import AnimeHomePageModel from "../models/AnimeHomePageModel.js";

export const getAnimeHomePageController = async (req,res) => {
  try {
    const response = await AnimeHomePageModel.find();
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json({message: 'An error happened while getting anime home page', error: err})
  }
}