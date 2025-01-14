import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const [animeSearch, setAnimeSearch] = useState('');
  const [embedLink, setEmbedLink] = useState('');
  const [animeID, setAnimeID] = useState('');
  const [animeHomePageLink, setAnimeHomePageLink] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');

  const getAnimeList = async () => {
    try {
      const animeListResponse = await axios.get('http://localhost:5000/user/get-anime-video')
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

    if (!episodeNumber || !embedLink || !episodeTitle) {
      console.log('Please fill all the fields, all fields are required!');
      return;
    }

    const formData = {
      episodeNumber,
      episodeTitle,
      embedLink,
    }

    try {
      const addAnimeVideo = await axios.post(`http://localhost:5000/user/add-anime-video/${animeID}`, formData)
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
          <label className="text-xl font-semibold font-mono text-black">Bölüm Adı</label>
          <input type="text" value={episodeTitle} onChange={(e) => setEpisodeTitle(e.target.value)} className="bg-slate-100 py-1 px-4 rounded-lg" />
          <label className="text-xl font-semibold font-mono text-black">Anime Embed Kodu</label>
          <input type="text" value={embedLink} onChange={(e) => setEmbedLink(e.target.value)} className="bg-slate-100 py-1 px-4 rounded-lg" />
          <label className="text-xl font-semibold font-mono text-black">Anime ID</label>
          <input type="text" value={animeID} onChange={(e) => setAnimeID(e.target.value)} className="bg-slate-100 py-1 px-4 rounded-lg" />
          <label className="text-xl font-semibold font-mono text-black">Bölüm Numarası</label>
          <input type="text" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} placeholder="x.Bölüm" className="bg-slate-100 py-1 px-4 rounded-lg" />
          <button type="submit" className="px-16 py-2 rounded-full bg-neutral-900 font-semibold text-white text-xl mt-5">Ekle</button>
        </form>
      </section>
      <section className="flex flex-col justify-center items-center mb-10 mt-10">
       <input type="text" placeholder='Anime ara..' className="bg-slate-100 w-full text-black rounded-lg py-2 px-4 mb-10" value={animeSearch} onChange={handleSearch}/>
       <table className="w-1/4 h-full bg-slate-50">
          <thead>
            <tr>
              <th className="font-semibold text-xl text-center px-16">Bölüm İsmi</th>
              <th className="font-semibold text-xl text-center px-16">Bölüm Numarası</th>
              <th className="font-semibold text-xl text-center px-16">Düzenle</th>
            </tr>
          </thead>
          <tbody>
          {filteredAnimeList.length === 0 ? (
            <tr>
              <td colSpan="3">Henüz bir anime yok.</td>
            </tr>
          ) : (
            filteredAnimeList.map((anime, index) => (
              anime.animeEpisodes.map((episode, episodeIndex) => (
                <tr key={`${index}-${episodeIndex}`} className="">
                  <td className="font-semibold text-xl text-center w-full">{episode.episodeTitle}</td>
                  <td className="font-semibold text-xl text-center w-full">{episode.episodeNumber}</td>
                  <td className="font-semibold text-xl text-center w-full">
                    <button
                      onClick={() => handleDelete(anime._id)}
                      className="justify-center items-center bg-neutral-900 py-2 px-6 rounded-lg text-white font-semibold mb-4"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ))
          )}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default AddAnime
