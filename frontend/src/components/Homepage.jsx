import React, { act, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Homepage = ({setIsCalendarOpen, isCalendarOpen}) => {
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

 const getFeaturedAnime = async () => {
  try {
    const response = await axios.get('http://localhost:5000/user/get-featured-anime-list');
    setFeautredAnimeList(response.data)
  } catch (error) {
    console.log('An error happened while fetching Featured Anime List', error)
  }
 }

 useEffect(() => {
  getCalendarInfo();
  getFeaturedAnime();
 }, [])

  const isClicked = () => {
   setIsActive(true)
  }

  const navigate = useNavigate();

  return (
      <div className="flex flex-col bg-neutral-800 min-h-screen">
      <div className="md:px-80">
"       <div className={`flex flex-row md:flex md:flex-row md:gap-x-16 md:justify-center ${isCalendarOpen ? "block" : "hidden sm:block"}`}>
          {days.map((day) => (
            <h1 key={day.name} className={`font-semibold text-sm py-1 ml-1 text-white px-3 rounded-lg md:text-2xl md:py-2 md:px-8 ${activeDay === day.name ? "bg-neutral-500" : ""}`} onClick={() => setActiveDay(day.name)}>{day.label}</h1>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center md:mt-10 md:mb-10 w-full">
  <div className={`md:grid md:grid-cols-3 gap-x-4 bg-neutral-800 rounded-3xl w-full ${isCalendarOpen ? "block" : "hidden sm:block"}`}>
    {calendar.filter((anime) => anime.selectedDays.includes(activeDay)).map((anime, index) => (
      <div key={anime._id} className="flex flex-row justify-center items-center w-full rounded-lg mb-5 mt-5">
        <div className="relative flex h-full flex-row items-center bg-neutral-700 w-full border-4 border-white ml-4 mr-4 rounded-full">
          <div className="h-full">
            <img src={`/calendarphotos/${anime.photo}`} className="md:h-40 md:w-52 h-28 w-32 object-cover rounded-l-full" alt="Anime" />
          </div>
          <div className="px-3 w-full">
            <div className="mr-10">
              <h1 className="text-white font-semibold font-customBerbas text-sm md:text-xl mb-3 max-w-44 md:max-w-64 transform truncate overflow-hidden whitespace-nowrap">{anime.animeName}</h1>
              <h1 className="text-white font-semibold font-mono text-sm md:text-lg">{anime.episodeOfAnime}</h1>
            </div>
            <div className="absolute right-10 bottom-5">
              <Link to={anime.animeSeriesLink} className="text-blue-400 font-semibold text-xs md:text-sm underline">
                Animeye git =>
              </Link>
            </div>
          </div>
          <div className="absolute top-5 right-6 md:top-7 md:right-10">
            <h1 className="text-white font-semibold text-sm md:text-xl">{anime.hourOfRelease}</h1>
          </div>
        </div>
      </div>
      ))}
      </div>
    </div>

        <div>
          <div className="bg-neutral-700 w-full h-full h-96 mt-2 rounded-lg">
           <div className="">
            <h1 className="text-white font-customBebas text-lg tracking-wider py-6 md:text-4xl text-nowrap ml-4">Öne Çıkan Animeler</h1>
           </div>
          <div className="relative">
            {/* Sol kaydırma butonu */}
            <button 
              className="absolute right-20 top-[-24px] transform -translate-y-1/2 text-2xl bg-neutral-800 text-white rounded-full px-6 py-1 hover:bg-neutral-700 z-10"
              onClick={() => document.getElementById("anime-slider").scrollLeft -= 200}>
              ‹
            </button>

            {/* Sağ kaydırma butonu */}
            <button 
              className="absolute right-4 top-[-24px] transform -translate-y-1/2 text-2xl bg-neutral-800 text-white rounded-full px-6 py-1 hover:bg-neutral-700 z-10"
              onClick={() => document.getElementById("anime-slider").scrollLeft += 200}>
              ›
            </button>
          </div>

          <div 
            id="anime-slider" 
            className="flex flex-row group items-center overflow-x-auto whitespace-nowrap scrollbar-hide w-full h-full md:gap-x-0">
            {featuredAnimeList.slice(0,7).map((anime, index) => (
              <div 
                key={anime._id} 
                onClick={() => navigate(anime.linkOfAnime)} 
                className="relative cursor-pointer flex flex-row">
                <img 
                  src={`/featuredanimephotos/${anime.photo}`} 
                  className="h-72 w-48 object-cover transform transition-transform duration-300 hover:scale-110 md:mt-5 md:mb-5 md:ml-9 rounded"
                  alt={anime.nameOfAnime} 
                />
                <h1 className="text-white text-sm font-semibold bg-neutral-900 px-2 py-2 ml-[-3px] group-hover:scale-125 transform transition-transform duration-300 absolute left-10 bottom-10 rounded-r-md max-w-32 truncate overflow-hidden whitespace-nowrap">
                  {anime.nameOfAnime}
                </h1>
                <h1 className="flex flex-row items-center text-black text-sm font-semibold bg-slate-200 px-2 py-1 absolute right-0 bottom-5 rounded-l-md group-hover:scale-110 transform transition-transform duration-300">
                  <img src="/calendar.png" className="w-4 h-4 mr-0.5 group-hover:scale-110 transform transition-transform duration-300" />
                  {anime.yearOfAnime}
                </h1>
              </div>
            ))}
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
