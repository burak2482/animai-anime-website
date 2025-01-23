import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const AnimeVideoPage = () => {


 const {id, episodeNumber, seasonNumber} = useParams();
 const [animeData, setAnimeData] = useState(null);

 console.log(typeof episodeNumber);

 const getAnimeVideoLink = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/user/get-anime-video-player/${id}/${episodeNumber}`);
    setAnimeData(response.data)
  } catch (err) {
    console.log(err)
  }
 }

 useEffect(() => {
  getAnimeVideoLink();
 }, [id, episodeNumber])

 if(!animeData) return <div>Yükleniyor...</div>

 const currentEpisode = animeData.animeEpisodes.find((episode) => episode.episodeNumber === episodeNumber);

 const currentSeason = animeData.animeEpisodes.filter((season) => season.seasonNumber === seasonNumber);

  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-neutral-800 px-80">
      <section className="relative flex flex-col bg-neutral-700 w-full h-full rounded-lg">
         <h1 className="font-bold tracking-wider text-white font-customFjalla text-4xl mt-10 ml-5">{animeData.animeName} - {episodeNumber}. Bölüm</h1>
         <Link to={`/anime/${id}`} className="bg-neutral-800 px-6 absolute font-sans top-9 left-96 py-1 rounded-full text-lg text-white font-semibold max-w-72 text-nowrap text-center">Anime Ana Sayfasına Dön <span className="font-semibold text-3xl text-center ml-2">→</span></Link>
        <div className="">
          {currentEpisode ? (
            <div
              className="w-full max-w-[1600px] px-10 py-12 bg-neutral-800 h-auto mt-5 ml-5 mb-5 rounded-3xl"
              dangerouslySetInnerHTML={{
                __html: currentEpisode.embedLink.replace(
                  /<iframe/g,
                  '<iframe style="width: 100%; height: 600px;"'
                ),
              }}
            />
          ) : (
            <div className="text-white font-semibold">
              Üzgünüz, {episodeNumber}. Bölüm bulunamadı.
            </div>
          )}
        </div>
        <div className="absolute top-10 right-10">
            <Link to={`/anime/${id}/video/${seasonNumber}/${Number(episodeNumber) - 1}`} className="bg-neutral-800 text-white font-semibold tracking-wider text-lg px-4 py-2 rounded-full mr-3">Önceki Bölüm ‹‹</Link>
            <Link to={`/anime/${id}/video/${seasonNumber}/${Number(episodeNumber) + 1}`} className="bg-neutral-800 text-white font-semibold tracking-wider text-lg px-4 py-2 rounded-full">Sonraki Bölüm ››</Link>
        </div>
      </section>
      <section className="relative flex flex-row items-start bg-neutral-700 w-full h-full mt-5 rounded">
        <div className="flex flex-col items-center space-y-4 mb-20 ml-5">
        <h1 className="border-4 font-customBebas text-3xl font-semibold tracking-wider text-nowrap px-4 py-2 max-w-80 text-white rounded-full ml-5 mt-5">Sezonun Diğer Bölümleri</h1>
          <div>
            {currentSeason.length > 0 ? (
              currentSeason.map((anime, index) => (
                <div key={index}>
                  <Link to={`/anime/${id}/video/${seasonNumber}/${anime.episodeNumber}`} className="font-customFjalla text-white font-semibold text-2xl tracking-wider text-nowrap mb-2">
                    {animeData.animeName} - {anime.episodeNumber}. Bölüm
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-white font-semibold">
                Bu sezonda başka bölüm bulunamadı.
              </div>
            )}
          </div>
        </div>
        <div className="absolute flex flex-row space-x-3 items-center bottom-5 right-5">
          <h1 className="bg-neutral-900 text-white tracking-wider font-semibold text-2xl px-8 py-2 rounded-full">Paylaş</h1>
          <h1 className="bg-blue-600 text-white tracking-wider font-semibold text-2xl px-8 py-2 rounded-full">Paylaş</h1>
          <h1 className="bg-green-600 text-white tracking-wider font-semibold text-2xl px-8 py-2 rounded-full">Paylaş</h1>
        </div>
      </section>
    </main>
  )
}

export default AnimeVideoPage
