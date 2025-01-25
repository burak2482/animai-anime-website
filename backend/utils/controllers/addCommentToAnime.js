import AnimeCommentModel from "../models/AnimeCommentModel.js";

export const makeACommentToAnimeController = async (req,res) => {
  const {episodeNumber, seasonNumber, username, commentText, animeId } = req.body;

  try {
    const userId = req.user._id
    const aNewComment = await AnimeCommentModel.create({episodeNumber, seasonNumber, username, commentText, animeId, userId })
    res.status(200).json(aNewComment)
  } catch (err) {
    res.status(400).json({message: 'An error happened while creating comment to database', error: err})
  }
}