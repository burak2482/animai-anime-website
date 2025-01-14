import AnimeHomePageModel from "../models/AnimeHomePageModel.js";

export const getApiAnimeHomePage = async (req,res) => {
  const {id} = req.params;

  try {
    const apiResponse = await AnimeHomePageModel.findById(id)
    if (!apiResponse) {
      return res.status(400).json({message: 'The anime doesnt find.'})
    }
    res.status(200).json(apiResponse)
  } catch (err) {
    res.status(400).json({message: 'The anime doesnt find in AnimeHomePageModel', error: err})
  }
}