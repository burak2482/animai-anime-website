import React, { act, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Homepage = ({setIsCalendarOpen, isCalendarOpen}) => {
  const [activeDay ,setActiveDay] = useState("Pzt");
  const [calendar, setCalendar] = useState([]);
  const [itemsShow, setItemsShow] = useState(null);
  const [featuredAnimeList, setFeautredAnimeList] = useState([]);
  const [animeHomePageList, setAnimeHomePageList] = useState([]);

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

 const getAnimeHomePageList = async () => {

  try {
    const response = await axios.get('http://localhost:5000/user/get-anime-home-page');
    setAnimeHomePageList(response.data)
  } catch (error) {
    console.log('An error happened while getting anime home page list!', error)
  }
 }

 useEffect(() => {
  getCalendarInfo();
  getFeaturedAnime();
  getAnimeHomePageList();
 }, [])

  const isClicked = () => {
   setIsActive(true)
  }

  const navigate = useNavigate();

  const animeHomePageSliderRef = useRef();
  
  const featuredAnimeSliderRef = useRef();


  const scrollAnimeHomePageLeft = () => {
    animeHomePageSliderRef.current.scrollLeft -= 300;
  }

  const scrollAnimeHomePageRight = () => {
    animeHomePageSliderRef.current.scrollLeft += 300;
  }

  const scrollFeaturedAnimeLeft = () => {
    featuredAnimeSliderRef.current.scrollLeft -= 300;
  }

  const scrollFeaturedAnimeRight = () => {
    featuredAnimeSliderRef.current.scrollLeft += 300;
  }

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
          <div className="bg-neutral-700 w-full h-full  mt-2 rounded-lg">
           <div className="">
            <h1 className="text-white md:font-customBebas font-customJaro text-lg tracking-wider py-6 md:text-4xl text-xl text-nowrap md:ml-8 ml-3">Öne Çıkan Animeler</h1>
           </div>
           <div className="relative">
            <button onClick={scrollFeaturedAnimeLeft} className="absolute right-24 top-[-50px] bg-neutral-800 text-white font-semibold text-3xl rounded-full px-8 py-1">‹</button>
            <button onClick={scrollFeaturedAnimeRight} className="absolute right-4 top-[-50px] bg-neutral-800 text-white font-semibold text-3xl rounded-full px-8 py-1">›</button>
           </div>
          <div 
            className="flex flex-row items-center overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth w-full h-full md:gap-x-0" ref={featuredAnimeSliderRef}> 
            {featuredAnimeList.slice(0,18).map((anime, index) => (
              <div 
                key={anime._id}
                onClick={() => navigate(anime.linkOfAnime)} 
                className="relative cursor-pointer group scrollbar-hide whitespace-nowrap flex-shrink-0 overflow-x-auto flex flex-row">
                <img 
                  src={`/featuredanimephotos/${anime.photo}`} 
                  className="md:h-72 md:w-48 h-48 w-28 object-cover transform transition-transform duration-300 hover:scale-110 md:mt-5 md:mb-5 md:ml-9 ml-2.5 mb-2 rounded"
                  alt={anime.nameOfAnime} 
                />
                <h1 className="text-white text-sm font-semibold bg-neutral-900 left-2.5 bottom-9 px-2 py-1 md:px-2 md:py-2 md:ml-[-3px] group-hover:scale-125 transform transition-transform duration-300 absolute md:left-10 md:bottom-10 rounded-r-md max-w-24 md:max-w-32 truncate overflow-hidden whitespace-nowrap">
                  {anime.nameOfAnime}
                </h1>
                <h1 className="flex flex-row items-center text-black text-sm font-semibold bg-slate-200 px-1 md:px-2 md:py-1 absolute right-0 bottom-2 md:right-0 md:bottom-5 rounded-l-md group-hover:scale-110 transform transition-transform duration-300">
                  <img src="/calendar.png" className="md:w-4 md:h-4 w-3 h-3 mr-0.5 group-hover:scale-110 transform transition-transform duration-300" />
                  {anime.yearOfAnime}
                </h1>
              </div>
            ))}
          </div>
          </div>
        </div>
        <section>
          <div className="bg-neutral-700 w-full h-96 mt-2">
            <section className="">
              <h1 className="text-white py-2 text-lg md:text-2xl text-nowrap ml-2">Popüler Animelerden Son Bölümler</h1>
            </section>
            <div>
            </div>
          </div>
        </section>
        <section>
          <div className="relative bg-neutral-700 w-full h-full mt-2 rounded-lg scrollbar-hide">
            <section className="">
              <h1 className="text-white font-customBebas tracking-wider md:text-4xl text-nowrap ml-8 py-6 mb-5">Yeni Eklenen Animeler</h1>
            </section>
            <button onClick={scrollAnimeHomePageLeft} className="absolute right-24 top-8 bg-neutral-800 text-white font-semibold text-3xl rounded-full px-8 py-1">‹</button>
            <button onClick={scrollAnimeHomePageRight} className="absolute right-4 top-8 bg-neutral-800 text-white font-semibold text-3xl rounded-full px-8 py-1">›</button>

            <section className="flex flex-row overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth" ref={animeHomePageSliderRef}>
              {animeHomePageList.slice(0,18).map((anime,index) => (
                <div key={anime._id} className="relative flex flex-row flex-shrink-0 group cursor-pointer" onClick={() => navigate(`/anime/${anime._id}`)}>
                  <img src={`/animehomepagephotos/${anime.photo}`} className="md:h-72 md:w-48 object-cover ml-9 mb-5 rounded transform transition-transform duration-300 hover:scale-105 "alt={anime.animeName}  />
                  <h1 className="absolute bottom-12 left-9 px-2 py-1 bg-neutral-900 text-white font-semibold text-lg max-w-28 overflow-hidden transform transition-transform duration-300 group-hover:scale-110 whitespace-nowrap truncate rounded-r-lg">{anime.animeName}</h1>
                  <h1 className="flex flex-row whitespace-nowrap items-center justify-center text-black bg-white font-semibold bottom-8 right-0 text-md rounded-l-lg absolute px-2 py-1 transform transition-transform duration-300 group-hover:scale-110"><img src="./calendar.png" className="h-3 w-3 object-cover mr-1"/>{anime.animeYear}</h1>
                  <h1 className="absolute top-0 right-0 text-md text-white bg-red-500 font-semibold rounded-l-lg px-2 py-1 transform transition-transform duration-300 group-hover:scale-110 ">{anime.animeTotalEpisode}</h1>
                </div>
              ))}
            </section>
          </div>
        </section>
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
