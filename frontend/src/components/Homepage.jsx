import React from 'react'
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
      <div className="flex flex-col bg-neutral-800 min-h-screen">
      <div className="md:px-80">
        <div className="bg-neutral-700 w-full h-60 mt-1">
          <div className="border-b-2 ">
            <h1 className="text-white py-2 text-lg md:text-2xl text-nowrap ml-2"><img></img>En son izlediğim / gezindiğim bölümler</h1>
          </div>
          <div>
            <div>
              içerikler
            </div>
          </div>
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
