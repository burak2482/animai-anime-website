import React from 'react'

const AddAnimeHomePage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="w-full h-full">
        <form className="flex flex-col items-center justify-center">
          <label className="text-xl text-black text-mono font-semibold">Anime ismi</label>
          <input type="text" className="py-2 bg-slate-100 rounded-lg"></input>
          <label className="text-xl text-black text-mono font-semibold">Anime Açıklaması</label>
          <input type="text" className="py-2 bg-slate-100 rounded-lg"></input>
          <label className="text-xl text-black text-mono font-semibold">Anime Yılı</label>
          <input type="text" className="py-2 bg-slate-100 rounded-lg"></input>
          <label className="text-xl text-black text-mono font-semibold">Anime Fotoğrafı</label>
          <input type="text" className="py-2 bg-slate-100 rounded-lg"></input>
          <label className="text-xl text-black text-mono font-semibold">Anime Türleri</label>
          <select multiple={true}>
            <option>Fantastik</option>
            <option>Komedi</option>
            <option>Okul</option>
            <option>Slice of Life</option>
            <option>Isekai</option>
            <option>Dram</option>
            <option>Aksiyon</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default AddAnimeHomePage
