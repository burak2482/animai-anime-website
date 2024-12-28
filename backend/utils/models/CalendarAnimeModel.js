import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  animeName: {
    type: String,
    required: true,
  },
  episodeOfAnime: {
    type: String,
    required: true,
  },
  selectedDays: {
    type: Array,
    required: true,
  },
})

const CalendarModel = mongoose.model("calendar", Schema);

export default CalendarModel;