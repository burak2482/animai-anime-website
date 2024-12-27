import CalendarModel from "../models/CalendarAnimeModel.js";

export const addCalendarController = async (req, res) => {
  const { animeName, episodeOfAnime, selectedDays } = req.body;

  if (!animeName || !episodeOfAnime || !selectedDays) {
    console.log("Eksik alanlar:", { name, year, day });
    return res.status(400).json({ error: "Please fill all fields." });
  }

  try {
    const calendarAnime = await CalendarModel.create({ animeName, episodeOfAnime, selectedDays });
    res.status(201).json(calendarAnime);
  } catch (err) {
    console.error("An error happened while creating Calendar day.:", err.message);
    res
      .status(500)
      .json({ message: "An error happened while creating Calendar day." });
  }
};
