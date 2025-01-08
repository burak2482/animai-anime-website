import AnimeVideoModel from "../models/AnimeVideoModel.js";

export const deleteAnimeVideoController = async (req,res) => {
  const {id} = req.params;

  try {
    await AnimeVideoModel.findByIdAndDelete(id);
    res.status(200).json({messsage: 'Anime video succesfully deleted.'})
  } catch (err) {
    res.status(400).json({message: 'An error happened while deleting anime video!', error: err})
  }
}