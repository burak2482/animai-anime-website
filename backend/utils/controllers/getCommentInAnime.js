import AnimeCommentModel from "../models/AnimeCommentModel.js";

export const getACommentInAnimeController = async (req,res) => {
  const {animeId, episodeNumber, seasonNumber} = req.params;

  try {
    const comments = await AnimeCommentModel.find({animeId,episodeNumber,seasonNumber}).populate('userId', 'photo role').sort({timestamp: -1});
    res.status(200).json(comments)
  } catch (err) {
    res.status(400).json({message: 'An error happened while getting comments!', error: err})
  }
}