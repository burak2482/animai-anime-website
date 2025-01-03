import AnimeVideoModel from "../models/AnimeVideoModel";

export const addAnimeVideoController = async (req,res) => {
  const {animeName,animeEmbedCode,animePageLink} = req.body;

  if(!animeName || !animeEmbedCode || !animePageLink) {
    return res.status(400).json('Please fill the all fields!')
  }

  try {
    const animeVideo = await AnimeVideoModel.create({
      animeName,
      animeEmbedCode,
      animePageLink,
    })
    res.status(200).json(animeVideo)
  } catch (error) {
    console.log('Error message:', err.message)
    res.status(400).json('An Error happened while creating AnimeVideoModel', error)
  }
}