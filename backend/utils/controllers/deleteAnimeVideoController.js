import AnimeHomePageModel from "../models/AnimeHomePageModel.js";

export const deleteAnimeVideoController = async (req,res) => {
  const {id} = req.params;
  const {episodeId} = req.body;

  try {
    await AnimeHomePageModel.updateOne({_id: id}, {$pull: {animeEpisodes: {_id: episodeId }}});
    res.status(200).json({messsage: 'Anime video succesfully deleted.'})
  } catch (err) {
    res.status(400).json({message: 'An error happened while deleting anime video!', error: err})
  }
}