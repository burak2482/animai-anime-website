import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [animeName, setAnimeName] = useState('');
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const [animeSearch, setAnimeSearch] = useState('');
  const [animeEmbedCode, setAnimeEmbedCode] = useState('');
  const [animeHomePageLink, setAnimeHomePageLink] = useState('');
  const [animeEpisode, setAnimeEpisode] = useState('');

  const getAnimeList = async () => {
    try {
      const animeListResponse = await axios.get('http://localhost:5000/user/get-anime-video')
      console.log('Anime Listesi:', animeListResponse.data);
      setAnimeList(animeListResponse.data);
      setFilteredAnimeList(animeListResponse.data);
    } catch (err) {
      console.log('An error happened while getting anime video list', err.response?.data || err.message)
    }
  }

  useEffect(() => {
    getAnimeList();
  },[]);

  const addAnimeVideo = async (e) => {
    e.preventDefault();

    if (!animeName || !animeEpisode || !animeHomePageLink || !animeEmbedCode) {
      console.log('Please fill all the fields, all fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('animeName', animeName)
    formData.append('animeEmbedCode', animeEmbedCode)
    formData.append('animeHomePageLink', animeHomePageLink)
    formData.append('animeEpisode', animeEpisode)

    try {
      const addAnimeVideo = await axios.post('http://localhost:5000/user/add-anime-video', formData)
      getAnimeList();
      console.log('Anime Listesi:', animeList);
    } catch (err) {
      console.log('An error happened while posting anime video', err)
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setAnimeSearch(term);
  
    if (term === '') {
      setFilteredAnimeList(animeList);
    } else {
      const filteredAnimeList = animeList.filter((anime) => 
        anime.animeName.toLowerCase().includes(term) || anime.animeEpisode.toLowerCase().includes(term)
      );
      setFilteredAnimeList(filteredAnimeList);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete-anime-video/${id}`);
      setAnimeList((animeList) => animeList.filter((anime) => anime.id !== id));
      getAnimeList();
    } catch (err) {
      console.log("Error happened while deleting Anime info:", err.response?.data || err.message);
    }
  };

  

  return (
    <main className="flex flex-col justify-center items-center mt-[-50px]">
      <section className="">
        <form className="flex flex-col gap-y-8" onSubmit={addAnimeVideo}>
          <label className="text-xl font-semibold font-mono text-black">Anime Adı</label>
          <input type="text" value={animeName} onChange={(e) => setAnimeName(e.target.value)} className="bg-slate-100 py-1 rounded-lg" />
          <label className="text-xl font-semibold font-mono text-black">Anime Embed Kodu</label>
          <input type="text" value={animeEmbedCode} onChange={(e) => setAnimeEmbedCode(e.target.value)} className="bg-slate-100 py-1 rounded-lg" />
          <label className="text-xl font-semibold font-mono text-black">Anime Ana Sayfası Linki</label>
          <input type="text" value={animeHomePageLink} onChange={(e) => setAnimeHomePageLink(e.target.value)}className="bg-slate-100 py-1 rounded-lg" />
          <label className="text-xl font-semibold font-mono text-black">Anime Bölümü</label>
          <input type="text" value={animeEpisode} onChange={(e) => setAnimeEpisode(e.target.value)} placeholder="x.Bölüm" className="bg-slate-100 py-1 px-3 rounded-lg" />
          <button type="submit" className="px-16 py-2 rounded-full bg-neutral-900 font-semibold text-white text-xl mt-5">Ekle</button>
        </form>
      </section>
      <section className="flex flex-col justify-center items-center mb-10 mt-10">
       <input type="text" placeholder='Anime ara..' className="bg-slate-100 w-full text-black rounded-lg py-2 px-4 mb-10" value={animeSearch} onChange={handleSearch}/>
       <table className="w-1/4 h-full bg-slate-50">
          <thead>
            <tr>
              <th className="font-semibold text-xl text-center px-16">Anime İsmi</th>
              <th className="font-semibold text-xl text-center px-16">Anime Bölümü</th>
              <th className="font-semibold text-xl text-center px-16">Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnimeList.length === 0 ? (
              <tr>
                <td colSpan="3">Henüz bir anime yok.</td>
              </tr>
            ) : (
              filteredAnimeList.map((anime,index) => (
                <tr key={index} className="">
                  <td className="font-semibold text-xl text-center w-full">{anime.animeName}</td>
                  <td className="font-semibold text-xl text-center w-full">{anime.animeEpisode}</td>
                  <td className="font-semibold text-xl text-center w-full"><button onClick={() => handleDelete(anime._id)}className="justify-center items-center bg-neutral-900 py-2 px-6 rounded-lg text-white font-semibold mb-4">Sil</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default AddAnime
