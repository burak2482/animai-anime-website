import React from 'react'

const AddAnime = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[-50px]">
      <div className="">
        <form className="flex flex-col gap-y-8">
          <label className="text-xl font-semibold font-mono text-black">Anime Adı</label>
          <input type="text" className="bg-slate-100 py-1 rounded-lg"></input>
          <label className="text-xl font-semibold font-mono text-black">Anime Embed Kodu</label>
          <input type="text" className="bg-slate-100 py-1 rounded-lg"></input>
          <label className="text-xl font-semibold font-mono text-black">Anime Ana Sayfası Linki</label>
          <input type="text" className="bg-slate-100 py-1 rounded-lg"></input>
          <button className="px-16 py-2 rounded-full bg-neutral-900 font-semibold text-white text-xl mt-5">Ekle</button>
        </form>
      </div>
      <div>
        ANİME TOTAL LİSTESİ
      </div>
    </div>
  )
}

export default AddAnime
