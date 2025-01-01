import React, { act, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Homepage = () => {
  const [activeDay ,setActiveDay] = useState("Pzt");
  const [calendar, setCalendar] = useState([]);
  const [featuredAnimeList, setFeautredAnimeList] = useState([]);

  const days = [
    { name: "Pzt", label: "Pzt"},
    { name: "Salı", label: "Salı"},
    { name: "Çrş", label: "Çrş"},
    { name: "Pşb", label: "Pşb"},
    { name: "Cuma", label: "Cuma"},
    { name: "Cmts", label: "Cmts"},
    { name: "Pzr", label: "Pzr"},
  ];

 const getCalendarInfo = async () => {

  try {
    const response = await axios.get('http://localhost:5000/user/get-calendar');
    console.log('API Response:', response.data);
    setCalendar(response.data)
  } catch (err) {
    console.log('Error happened while getting Calendar Info', err)
  }
 }

 useEffect(() => {
  getCalendarInfo();
 }, [])

  const isClicked = () => {
   setIsActive(true)
  }
  return (
      <div className="flex flex-col bg-neutral-800 min-h-screen">
      <div className="md:px-80">
"       <div className="flex flex-row md:gap-x-16 md:justify-center">
          {days.map((day) => (
            <h1 key={day.name} className={`font-semibold text-sm py-1 ml-1 text-white px-3 rounded-lg md:text-2xl md:py-2 md:px-8 ${activeDay === day.name ? "bg-neutral-500" : ""}`} onClick={() => setActiveDay(day.name)}>{day.label}</h1>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-10 mb-10 w-full">
  <div className="grid grid-cols-3 gap-x-4 bg-neutral-800 rounded-3xl w-full">
    {calendar.filter((anime) => anime.selectedDays.includes(activeDay)).map((anime, index) => (
      <div key={anime._id} className="flex flex-row justify-center items-center w-full rounded-lg mb-5 mt-5">
        <div className="relative flex h-full flex-row items-center bg-neutral-700 w-full border-4 border-white ml-4 mr-4 rounded-full">
          <div className="h-full">
            <img src={`/calendarphotos/${anime.photo}`} className="h-40 w-52 object-cover rounded-l-full" alt="Anime" />
          </div>
          <div className="px-3 w-full">
            <div className="mr-10">
              <h1 className="text-white font-semibold font-serif text-lg mb-3 max-w-xs text-pretty">{anime.animeName}</h1>
              <h1 className="text-white font-semibold font-mono text-lg">{anime.episodeOfAnime}</h1>
            </div>
            <div className="absolute right-10 bottom-5">
              <Link to={anime.animeSeriesLink} className="text-blue-400 font-semibold text-sm underline">
                Animeye git =>
              </Link>
            </div>
          </div>
          <div className="absolute top-7 right-10">
            <h1 className="text-white font-semibold text-xl">{anime.hourOfRelease}</h1>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        <div>
          <div className="bg-neutral-700 w-full h-80 mt-2">
            <div className="border-b-2">
              <h1 className="text-white py-2 text-lg md:text-2xl text-nowrap ml-2">Öne Çıkan Animeler</h1>
            </div>
            <div>

            </div>
            <div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-neutral-700 w-full h-96 mt-2">
            <div className="border-b-2">
              <h1 className="text-white py-2 text-lg md:text-2xl text-nowrap ml-2">Popüler Animelerden Son Bölümler</h1>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-neutral-700 w-full h-44 mt-2">
            <div className="border-b-2">
              <h1 className="text-white text-lg md:text-2xl text-nowrap ml-2 py-2">Yeni Eklenen Animeler</h1>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-neutral-700 w-full h-96 mt-2">
            <div className="flex flex-row items-center justify-between border-b-2 py-2">
              <h1 className="text-white text-lg md:text-2xl text-nowrap ml-2">Yeni Eklenen Anime Bölümleri</h1>
              <Link to="/pages/yeni-eklenen-anime-bolumleri" className="font-semibold text-sm font-mono md:text-xl text-white mr-2">Tümünü gör</Link>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
