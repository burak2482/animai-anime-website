import AnimeHomePageModel from "../models/AnimeHomePageModel.js";

export const deleteAnimeHomePageController = async (req,res) => {
  const {id} = req.params;

  try {
    await AnimeHomePageModel.findByIdAndDelete(id)
    res.status(200).json({message: 'An Anime Home Page succesfully deleted!'})
  } catch (err) {
    res.status(400).json({message: 'An error happened while deleting anime home page!', error: err})
  }
}