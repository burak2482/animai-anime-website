import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from './context/useAuthContext'

const AnimeVideoPage = () => {


 const {id, episodeNumber, seasonNumber} = useParams();
 const [userData, setUserData] = useState([]);
 const [animeData, setAnimeData] = useState([]);
 const [comments, setComments] = useState([]);
 const [textComment, setTextComment] = useState('');

 const {user} = useAuthContext();

 const getAnimeVideoLink = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/user/get-anime-video-player/${id}/${episodeNumber}`);
    setAnimeData(response.data)
  } catch (err) {
    console.log(err)
  }
 }

 const getAnimeComments = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/user/get-comment-list-in-animelist/${id}/${seasonNumber}/${episodeNumber}`)
    setComments(response.data)
  } catch (err) {
    console.log(err)
  }
 }

 const getUserData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/account/get-user-profile-data-for-video-page/${user.token}`)
    setUserData(response.data)
  } catch (err) {
    console.log(err)
  }
 }

 const sendCommentData = async (e) => {
  e.preventDefault();

 const animeId = id
 const username = userData.nickname
 const commentText = textComment

 const config = {
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
};

 const sendingData = {
  episodeNumber,
  seasonNumber,
  animeId,
  username,
  commentText,
 }

  try {
    await axios.post(`http://localhost:5000/user/make-a-comment`, sendingData, config)
    getAnimeComments();
    setTextComment('');
  } catch (err) {
    console.log(err)
  }
 }
 
 useEffect(() => {
  getAnimeVideoLink();
  getAnimeComments();
  getUserData();
 }, [id, episodeNumber,seasonNumber])

 if(!animeData) return <div>Yükleniyor...</div>

 const currentEpisode = animeData?.animeEpisodes?.find((episode) => episode.episodeNumber === episodeNumber);

 const currentSeason = animeData?.animeEpisodes?.filter((season) => season.seasonNumber === seasonNumber);

  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-neutral-800 px-80">
      <section className="relative flex flex-col bg-neutral-700 w-full h-full rounded-lg">
         <h1 className="font-bold tracking-wider text-white font-customFjalla text-4xl mt-10 ml-5">{animeData.animeName} - {episodeNumber}. Bölüm</h1>
         <Link to={`/anime/${id}`} className="bg-neutral-800 px-6 absolute font-sans top-9 left-96 py-1 rounded-full text-lg text-white font-semibold max-w-72 text-nowrap text-center">Anime Ana Sayfasına Dön <span className="font-semibold text-3xl text-center ml-2">→</span></Link>
        <div className="">
          {currentEpisode ? (
            <div
              className="w-full max-w-[1200px] px-10 py-12 bg-neutral-800 h-auto mt-5 ml-5 mb-5 rounded-3xl"
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
        <div className="absolute top-12 right-[420px]">
            <Link to={`/anime/${id}/video/${seasonNumber}/${Number(episodeNumber) - 1}`} className="bg-neutral-800 text-white font-semibold tracking-wider text-lg px-4 py-2 rounded-full mr-3">Önceki Bölüm ‹‹</Link>
            <Link to={`/anime/${id}/video/${seasonNumber}/${Number(episodeNumber) + 1}`} className="bg-neutral-800 text-white font-semibold tracking-wider text-lg px-4 py-2 rounded-full">Sonraki Bölüm ››</Link>
        </div>
        <div className="absolute top-10 right-10 flex flex-col items-center space-y-4 mb-20 ml-5">
        <h1 className="border-4 font-customBebas text-3xl font-semibold tracking-wider text-nowrap px-4 py-2 max-w-80 text-white rounded-full ml-5 mt-5">Sezonun Diğer Bölümleri</h1>
          <div>
            {currentSeason?.length > 0 ? (
              currentSeason?.map((anime, index) => (
                <div key={index} className="">
                  <Link to={`/anime/${id}/video/${seasonNumber}/${anime.episodeNumber}`} className="font-customFjalla text-white font-semibold text-3xl tracking-wider text-nowrap mb-2">
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
      </section>
      <section className="relative flex flex-col items-start bg-neutral-700 w-full h-full mt-5 rounded">
        <div className="flex flex-col w-full h-full">
          {user ? (
           <div className="relative flex flex-row items-center">
            <div className="absolute top-5 left-36 flex flex-col items-center border-8 border-neutral-600 rounded-xl h-60 w-52 bg-neutral-800">
              <img src={userData.photo} className="w-20 h-20 rounded-full mt-4 object-cover" />
              <h1 className="font-semibold text-2xl text-white mb-5 mt-2">{userData.nickname}</h1>
              <h1 className={`border-4 text-xl px-6 py-1 font-customFjalla font-bold rounded-xl mb-5 ${userData.role === 'admin' ? "border-red-800 text-red-800" : "border-blue-700 text-blue-400"}`}>{userData.role}</h1>
            </div>
            <form className="flex flex-col justify-center items-center relative w-full h-full mt-5 ml-28" onSubmit={sendCommentData}>
              <textarea type="text" className="w-2/3 h-60 rounded-xl bg-neutral-800 text-white text-xl px-5 py-2" placeholder="Yorumunuzu buradan yapabilirsiniz." value={textComment} onChange={(e) => setTextComment(e.target.value)} />
              <button className="absolute  bottom-2 right-72 bg-neutral-700 text-white rounded-full text-lg font-semibold px-12 py-2 ">Mesajını gönder</button>
            </form>
          </div>
          ) : (
            <h1>Yorum yapmak için lütfen giriş yapınız.</h1>
          )}
        </div>
        <div>
       {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex flex-row items-center text-white text-lg font-semibold mb-2 ml-7 mt-10">
              <div className="flex flex-col items-center justify-center bg-neutral-800 py-8 items-center border-8 border-neutral-600 rounded-xl px-12">
                <img 
                  src={comment.userId?.photo} 
                  className="w-20 h-20 rounded-full object-cover mb-2" 
                  alt={comment.username}
                />
                <h1 className="font-sans font-semibold text-xl text-white mb-2">{comment.username}</h1>
                <h1 
                className={`px-7 py-1 rounded-xl font-bold font-customFjalla border-4 font-semibold mt-2
                  ${comment.userId?.role === 'admin' 
                    ? "border-red-800 text-red-800" 
                    : "border-blue-700 text-blue-400"}`}
              >
                {comment.userId?.role}
              </h1>
              </div>
              <div className="w-full h-full py-24 max-h-60 ml-2 px-10 bg-neutral-800 rounded-xl flex items-center">
               <p className=" text-white text-2xl font-sans mt-2 max-w-7xl line-clamp-3">{comment.commentText}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="font-semibold text-white w-full h-full ml-10 py-10 text-2xl">
            Şu an herhangi bir yorum yok.
          </div>
        )}
        </div>
      </section>
    </main>
  )
}

export default AnimeVideoPage
