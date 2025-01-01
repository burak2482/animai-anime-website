import FeaturedAnimeModel from "../models/FeaturedAnimeModel.js";

export const deleteFeaturedAnime = async (req,res) => {
  const {id} = req.params;

  try {
    await FeaturedAnimeModel.findByIdAndDelete(id)
    res.status(200).json({message:'Featured anime deleted succesfully'})
  } catch (err) {
    res.status(400).json({message: 'An Error happened while deleting featured anime!'})
  }
}