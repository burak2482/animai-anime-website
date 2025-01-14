import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AnimeHomePage = () => {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);

  const getApiAnimeHomePageData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/api/get-anime-home-page/${id}`);
      setAnimeData(response.data);
    } catch (err) {
      console.error('API çağrısında hata:', err);
    }
  };

  useEffect(() => {
    getApiAnimeHomePageData();
  }, [id]);

  if (!animeData) return <div>Yükleniyor...</div>;

  return (
    <main className="flex flex-col items-center bg-neutral-800 w-full h-full min-h-screen md:px-80">
      <div className="relative flex flex-row justify-center items-center ml-4 bg-neutral-700 w-full mr-4 rounded-lg">
        <section className="flex flex-col items-center justify-center mt-10 mb-10 ml-10">
          <img 
            src={`/animehomepagephotos/${animeData.photo}`} 
            alt={animeData.animeName} 
            className="h-96 w-64 object-cover rounded"
          />
        </section>
        <section className="flex flex-col ml-5 w-full px-4">
          <h1 className="font-semibold font-customRubik text-4xl text-white mb-5 mt-6 tracking-wider">{animeData.animeName}</h1>
          <div className="flex flex-row w-full mb-6">
            <h1 className="bg-yellow-50 text-black font-semibold font-sans px-4 py-1 whitespace-nowrap text-lg text-center rounded mr-1">+13</h1>
            <h1 className="bg-green-500 text-white font-semibold px-4 whitespace-nowrap text-center py-1 rounded mr-1">{animeData.animeTotalEpisode}</h1>
            <h1 className="bg-pink-400 text-black font-semibold font-sans px-4 whitespace-nowrap text-center py-1 rounded">HD</h1>
          </div>
          <p className="text-xl font-semibold font-sans text-white text-pretty">{animeData.animeDescription}</p>
        </section>
        <section className="absolute top-10 right-10">
          <div className="flex flex-col">
            <h1 className="font-semibold text-white font-customBebas tracking-wider text-2xl mb-2">Türler:</h1>
            <div>
              <h1 className="text-white bg-pink-400 px-4 rounded-full font-semibold text-lg tracking-wider">{animeData.selectedGenres}</h1>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-neutral-700 w-full h-full px-80 mt-5 rounded">
        {animeData.animeEpisodes && animeData.animeEpisodes.map((episode, index) => (
          <div key={index} onClick={() => handleAnimeClick(episode.id)}>
            <h1 className="font-semibold text-white text-4xl mb-2 font-mono">{animeData.animeName} - {episode.episodeNumber}. Bölüm</h1>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AnimeHomePage;
