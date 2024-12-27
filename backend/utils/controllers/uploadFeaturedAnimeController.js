import FeauturedAnimeModel from '../models/FeaturedAnimeModel.js'

export const uploadFeaturedAnime = async (req,res) => {

    const {name,year,type} = req.body

    if (!name || req.file || !year || !type) {
      console.log('Eksik alanlar:', {type, file: req.file, name})
      res.status(400).json({error: 'Please fill all fields'});

    try {
      const FeaturedAnime = await FeauturedAnimeModel.create({
        type,
        name,
        year,
        photo: req.file.name,
      });
      res.status(200).json(FeaturedAnime);
    } catch (err) {
      res.status(400).json({message: 'Error happened while creating featured Anime', error: err});
    }
  }
}