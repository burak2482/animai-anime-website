import FeaturedAnimeModel from '../models/FeaturedAnimeModel.js'

export const getFeaturedAnimeList = async (req,res) => {
  try {
    const response = await FeaturedAnimeModel.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({error: 'There is an error while getting database information'})
  }
}
