import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FeaturedAnimeList = () => {
  const [nameOfAnime, setNameOfAnime] = useState('');
  const [yearOfAnime, setYearOfAnime] = useState('');
  const [linkOfAnime, setLinkOfAnime] = useState('');
  const [photo, setPhoto] = useState(null);
  const [featuredAnimeList, setFeaturedAnimeList] = useState([]);

  const getFeaturedAnime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/get-featured-anime-list');
      setFeaturedAnimeList(response.data);
    } catch (err) {
      console.log('An error happened while getting Featured anime info', err);
    }
  };

  useEffect(() => {
    getFeaturedAnime();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameOfAnime || !yearOfAnime || !linkOfAnime) {
      console.log('Please fill all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('nameOfAnime', nameOfAnime);
    formData.append('yearOfAnime', yearOfAnime);
    formData.append('linkOfAnime', linkOfAnime);
    formData.append('photo', photo);

    try {
      const response = await axios.post(`http://localhost:5000/user/add-featured-anime`, formData);
      console.log('Form data added successfully', response.data);
      setFeaturedAnimeList((prev) => [...prev, response.data]);

      setYearOfAnime('');
      setLinkOfAnime('');
      setNameOfAnime('');
    } catch (err) {
      console.log('Error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete-featured-anime/${id}`);
      setFeaturedAnimeList((featuredAnime) => featuredAnime.filter((anime) => anime._id !== id));
      getFeaturedAnime();
    } catch (err) {
      console.log("An error happened while deleting featured Anime!");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[-96px]">
        <h1 className="font-semibold text-3xl text-black mb-10">Öne Çıkan Anime Ekle</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black mb-3">Animenin Adı</label>
            <input type="text" value={nameOfAnime} onChange={(e) => setNameOfAnime(e.target.value)} className="rounded-md bg-slate-50 py-2 text-start align-text-top resize-none" />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black mb-3">Animenin Yılı</label>
            <input type="text" value={yearOfAnime} onChange={(e) => setYearOfAnime(e.target.value)} className="rounded-md bg-slate-50 py-2 text-start align-text-top resize-none" />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black mb-3">Animenin Linki</label>
            <input type="text" value={linkOfAnime} onChange={(e) => setLinkOfAnime(e.target.value)} className="rounded-md bg-slate-50 py-2 text-start align-text-top resize-none" />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black mb-3">Animenin Kapak Fotoğrafı</label>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="rounded-md bg-slate-50 text-start align-text-top resize-none" />
          </div>
          <div className="px-44 justify-center items-center flex flex-col">
            <button className="px-20 py-2 bg-black text-2xl text-white font-semibold rounded-full">Ekle</button>
          </div>
        </form>
        <div className='flex flex-col mt-10 h-full w-1/4 items-center justify-center mb-20'>
          <table className="w-1/4 h-full bg-slate-50 ">
            <thead>
              <tr>
                <th className="border px-10 py-3 md:py-6 text-xl text-center">Animenin İsmi</th>
                <th className="border px-10 py-3 md:py-6 text-xl text-center">Animenin Yılı</th>
                <th className="border px-10 py-3 md:py-6 text-xl text-center">Düzenle</th>
              </tr>
            </thead>
            <tbody>
              {featuredAnimeList.map((anime) => (
                <tr key={anime._id}>
                  <td className="border px-2 md:px-9 text-xl font-semibold text-center py-2 md:py-4">{anime.nameOfAnime}</td>
                  <td className="border px-2 md:px-9 text-xl font-semibold text-center py-2 md:py-4">{anime.yearOfAnime}</td>
                  <td className="border px-2 md:px-9 text-xl font-semibold text-center py-2 md:py-4">
                    <button onClick={() => handleDelete(anime._id)} className="bg-neutral-900 text-white px-10 py-2 rounded-lg">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAnimeList;
