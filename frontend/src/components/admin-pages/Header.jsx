import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="fixed w-full border-b-2 border-neutral-500 py-12">
      <div className="flex flex-row justify-between items-center bg-white">
        <div className="w-64 py-2">
          <Link to="/pages/admin-page-home" className="font-semibold font-customRubik text-5xl text-black border-r-2 ml-10 pr-9 border-black py-12 text-center">ANIMAI</Link>
        </div>
        <div className="justify-center w-2/4">
          <h1 className="font-semibold text-4xl text-black text-nowrap ml-96">Admin Panel</h1>
        </div>
        <Link to="/" className="py-4 px-8 bg-black text-white font-semibold mr-20 rounded-lg">Ana sayfaya dön</Link>
      </div>
    </div>
  )
}

export default Header
