import AnimeHomePageModel from "../models/AnimeHomePageModel.js";
import mongoose from 'mongoose';


export const getAnimeVideoPlayerController = async (req,res) => {
  const { id, episodeNumber } = req.params;

  console.log(typeof episodeNumber); 

  try {
    const animeVideo = await AnimeHomePageModel.findOne({_id : new mongoose.Types.ObjectId(id), "animeEpisodes.episodeNumber": episodeNumber,})
    res.status(200).json(animeVideo)
  } catch (err) {
    console.error("Error during request:", err);
    res.status(400).json({message: 'An error happened while getting anime video player!', error: err})
  }
}
