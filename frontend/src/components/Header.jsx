import React from 'react'
import { Link, Navigate, useBlocker } from 'react-router-dom';
import { useAuthContext } from './context/useAuthContext';


const Header = ({isCalendarOpen, setIsCalendarOpen}) => {

  const {user} = useAuthContext();
  console.log("User durumu:", user);

  return (
    <div className="bg-neutral-800">
      <div className="md:px-80 md:py-8">
        <div className="relative bg-neutral-700 flex flex-row items-center py-5">
          <div className="">
            <Link to="/" className="font-customRubik text-white text-2xl md:text-5xl ml-4 tracking-wide md:ml-12 items-center">ANIMAI</Link>
          </div>
          <div className="hidden absolute top-[-3px] left-52 sm:block w-1/3 flex flex-row items-center relative">
            <input type="text" placeholder="aramak istediğiniz animeyi arayın.." className="bg-slate-100 py-2 w-3/4 px-12 text-lg ml-16 text-nowrap font-semibold rounded-lg"></input>
            <button className="bg-neutral-600 py-3 px-3 absolute right-16 rounded-r-lg"><img src="./whitesearch.png" className="w-5 h-5"></img></button>
          </div>
          <div className="absolute top-5 right-6 flex flex-row md:gap-x-8">
            <Link to="/account/sign-up" className={`text-white font-mono text-sm mr-3 md:text-3xl md:mr-0 flex flex-row items-center border-2 md:px-2 rounded-full p-1 ${user ? "hidden" : "block" }`}><img src="./person.png" className="w-3 h-3 md:w-5 md:h-5 mr-1"></img>Üye Ol</Link>
            <Link to="/account/log-in" className={`text-white font-mono text-sm mr-3 md:text-3xl md:mr-4 flex flex-row items-center border-2 md:px-2 rounded-full p-1 ${user ? "hidden" : "block"}`}><img src="./key.png" className="w-3 h-3 md:w-5 md:h-5 mr-1"></img>Giriş Yap</Link>
            <Link to="/account/user-profile" className={`${ user ? "text-white font-mono text-sm mr-3 md:text-3xl md:mr-4 flex flex-row items-center border-2 md:px-2 rounded-full p-1" : "hidden"}`}>Profil Sayfası</Link>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="bg-neutral-800 gap-x-6 w-full flex flex-row py-3">
            <Link className="font-semibold font-customFjalla tracking-wider text-white ml-3 border-4 rounded-full px-3 py-1 md:text-2xl md:ml-10">Anasayfa</Link>
            <h1 onClick={() => setIsCalendarOpen(!isCalendarOpen)} className="font-semibold text-white md:text-2xl block sm:hidden">Takvim</h1>
            <Link className="font-semibold font-customFjalla tracking-wider border-4 rounded-full px-3 py-1 text-white md:text-2xl">Anime Arşivi</Link>
            <Link className="hidden sm:block font-customFjalla tracking-wider border-4 rounded-full px-3 py-1 font-semibold text-white text-2xl">Yeni Bölümler</Link>
            <Link className="hidden sm:block font-customFjalla tracking-wider border-4 rounded-full px-3 py-1 font-semibold text-white text-2xl">Anime Listem</Link>
            <Link className="hidden sm:block font-customFjalla tracking-wider border-4 rounded-full px-3 py-1 font-semibold text-white text-2xl">İletişim</Link>
          </div>
          <div>
            <div className="md:hidden">
              <img src="./menu.png" className="w-7 h-7 mr-3"></img>
            </div>
          </div>
        </div>
        <div className="md:hidden bg-neutral-700 w-full py-2 relative">
          <input type="text" placeholder="aramak istediğiniz animeyi arayın.." className="bg-slate-100 w-72 px-6 text-md text-nowrap text-sm font-semibold rounded-lg ml-2"></input>
          <img src="./search.png" className="absolute right-24 top-1/2 transform -translate-y-1/2 w-5 h-5"></img>
        </div>
      </div>
    </div>
  )
}

export default Header
