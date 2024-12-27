import CalendarModel from "../models/CalendarAnimeModel.js";

export const getCalendarController = async (req,res) => {
  try {
    const response = await CalendarModel.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error: 'There is an error happened while getting Calendar info.' })
  }
}