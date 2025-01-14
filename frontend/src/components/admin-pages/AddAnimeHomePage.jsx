import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

const AddAnimeHomePage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [animeName, setAnimeName] = useState('');
  const [animeYear, setAnimeYear] = useState('');
  const [animeDescription, setAnimeDescription] = useState('');
  const [animeTotalEpisode, setAnimeTotalEpisode] = useState('');
  const [photo, setPhoto] = useState(null);

  const genres = [
    {name: "Isekai", label: "Isekai"},
    {name: "Aksiyon", label: "Aksiyon"},
    {name: "Fantastik", label: "Fantastik"},
    {name: "Okul", label: "Okul"},
    {name: "Slice of Life", label: "Slice of Life"},
    {name: "Komedi", label: "Komedi"},
    {name: "Dram", label: "Dram"},
    {name: "Romantik", label: "Romantik"},
    {name: "Ecchi", label: "Ecchi"},
  ]

  const handleCheckbox = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres((prevGenres) => [...prevGenres, genre])
    }
  }

  const getAnimeHomePageList = async () => {
    try {
      const animeHomePageResponse = await axios.get('http://localhost:5000/user/get-anime-home-page')
      setAnimeList(animeHomePageResponse.data)
    } catch (err) {
      console.log('An error happened while fetching anime home page!')
    }
  }

  useEffect(() => {
    getAnimeHomePageList();
  }, []);
  

  const addAnimeHomePageFunc = async (e) => {
    e.preventDefault();

    if(!animeName || !animeTotalEpisode || !animeYear || !animeDescription ) {
      console.log('Please fill all the fields, all fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('animeName', animeName)
    formData.append('animeYear', animeYear)
    formData.append('animeTotalEpisode', animeTotalEpisode)
    formData.append('animeDescription', animeDescription)
    formData.append('selectedGenres', selectedGenres);
    formData.append('photo', photo)

    try {
      const addAnimeHomePage = await axios.post('http://localhost:5000/user/add-anime-home-page', formData)
      setAnimeList((prevAnimeList) => [...prevAnimeList, addAnimeHomePage.data])
    } catch (err) {
      console.log({message: 'An error happened while posting anime home page', error: err})
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete-anime-home-page/${id}`)
      setAnimeList((prevAnimeList) => prevAnimeList.filter((anime) => anime.id !== id))
      getAnimeHomePageList();
    } catch (err) {
      console.log({message: 'An error happened while deleting anime home page!', error: err})
    }
  }

  return (
    <main className="flex flex-col">
      <section>
        <form className="flex flex-col gap-y-5" onSubmit={addAnimeHomePageFunc}>
          <label className="text-2xl text-black font-semibold">Anime İsmi</label>
          <input
            type="text"
            value={animeName}
            onChange={(e) => setAnimeName(e.target.value)}
            className="py-2 bg-slate-100 rounded-lg px-8"
          />
          <label className="text-2xl text-black font-semibold">Anime Açıklaması</label>
          <textarea
            value={animeDescription}
            onChange={(e) => setAnimeDescription(e.target.value)}
            className="h-64 py-4 bg-slate-100 w-full text-start align-text-top resize-none rounded-lg px-4"
          />
          <label className="text-2xl text-black font-semibold">Anime Yılı</label>
          <input
            type="text"
            value={animeYear}
            onChange={(e) => setAnimeYear(e.target.value)}
            className="py-2 bg-slate-100 rounded-lg px-8"
          />
          <label className="text-2xl text-black font-semibold">Anime Bölümü</label>
          <input type="text" value={animeTotalEpisode} onChange={(e) => setAnimeTotalEpisode(e.target.value)} className="py-2 bg-slate-100 w-full px-4 rounded-lg"/>
          <label className="text-2xl text-black font-semibold">Anime Fotoğrafı</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="py-2 bg-slate-100 rounded-lg px-8"
          />
          <label className="text-2xl text-black font-semibold">Anime Türleri</label>
          {genres.map((genre) => (
            <div key={genre.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={genre.name}
                checked={selectedGenres.includes(genre.name)}
                onChange={() => handleCheckbox(genre.name)}
              />
              <label>{genre.label}</label>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <button className="px-28 py-2 bg-neutral-900 text-white font-semibold text-xl rounded-full mt-10">Ekle</button>
          </div>
        </form>
      </section>
      <section>
      {animeList?.length > 0 ? (
        <table className="w-full h-full bg-slate-50 mb-10 mt-10">
          <thead>
            <tr>
              <th className="border py-3 px-10 font-semibold text-2xl text-center">Anime İsmi</th>
              <th className="border py-3 px-10 font-semibold text-2xl text-center">Anime Bölümü</th>
              <th className="border py-3 px-10 font-semibold text-2xl text-center">Anime Türleri</th>
              <th className="border py-3 px-10 font-semibold text-2xl text-center">Anime ID</th>
              <th className="border py-3 px-10 font-semibold text-2xl text-center">Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {animeList.map((anime, index) => (
              <tr key={index}>
                <td className="font-semibold text-lg text-center">{anime.animeName}</td>
                <td className="font-semibold text-lg text-center">{anime.animeTotalEpisode}</td>
                <td className="font-semibold text-lg text-center">{anime.selectedGenres?.join(", ")}</td>
                <td className="font-semibold text-lg text-center">{anime._id}</td>
                <td className="flex flex-col justify-center items-center">
                  <button className="py-2 px-8 bg-neutral-900 text-white font-semibold text-xl mt-2 mb-2 rounded-lg" onClick={() => handleDelete(anime._id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Henüz bir anime eklenmedi.</p>
      )}
    </section>
  </main>
  )
}

export default AddAnimeHomePage
