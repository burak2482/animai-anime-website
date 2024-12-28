import CalendarModel from "../models/CalendarAnimeModel.js";

export const deleteCalendarController = async (req,res) => {
  const {id} = req.params;

  try {
    await CalendarModel.findByIdAndDelete(id);
    res.status(200).json({message: 'Calender info deleted succesfully'})
  } catch (err) {
    res.status(500).json({message: 'Error happened while deleting Calendar info', error: err})
  }
}
