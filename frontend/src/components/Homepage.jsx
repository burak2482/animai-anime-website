import React, { act, useState } from 'react'
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [activeDay ,setActiveDay] = useState("Pzt");

  const days = [
    { name: "Pzt", label: "Pzt"},
    { name: "Salı", label: "Salı"},
    { name: "Çşb", label: "Çşb"},
    { name: "Pşb", label: "Pşb"},
    { name: "Cuma", label: "Cuma"},
    { name: "Cmts", label: "Cmts"},
    { name: "Pzr", label: "Pzr"},
  ];

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
        <div>
          <div className="bg-neutral-700 w-full h-44 mt-2">
            <div className="border-b-2">
              <h1 className="text-white py-2 text-lg md:text-2xl text-nowrap ml-2">Öne Çıkan Animeler</h1>
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
