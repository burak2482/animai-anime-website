import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimeCalendar = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [animeName, setAnimeName] = useState('');
  const [episodeOfAnime, setEpisodeOfAnime] = useState('');
  const [animeSeriesLink, setAnimeSeriesLink] = useState('');
  const [photo, setPhoto] = useState(null);
  const [calendar, setCalendar] = useState([]);

  const days = [
    { name: 'Pzt', label: 'Pazartesi' },
    { name: 'Salı', label: 'Salı' },
    { name: 'Çrş', label: 'Çarşamba' },
    { name: 'Prş', label: 'Perşembe' },
    { name: 'Cuma', label: 'Cuma' },
    { name: 'Cts', label: 'Cumartesi' },
    { name: 'Pzr', label: 'Pazar' },
  ];

  const handleCheckboxChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!animeName || !episodeOfAnime || !selectedDays.length) {
      console.log('Please fill all the fields, all fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('animeName', animeName);
    formData.append('episodeOfAnime', episodeOfAnime);
    formData.append('selectedDays', selectedDays);
    formData.append('animeSeriesLink', animeSeriesLink);
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:5000/user/add-calendar', formData);
      console.log('Calendar day added!', response.data);
      setCalendar((prev) => [...prev, response.data]);

      // Formu sıfırla
      setAnimeName('');
      setEpisodeOfAnime('');
      setSelectedDays([]);
    } catch (err) {
      console.log('Error:', err.response?.data || err.message);
    }
  };

  const getCalendarInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/get-calendar');
      setCalendar(response.data);
    } catch (err) {
      console.log('Error happened:', err);
    }
  };

  useEffect(() => {
    getCalendarInfo();
  }, []);

  const handleCalendarDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete-calendar/${id}`);
      setCalendar((prevCalendar) =>
        prevCalendar.filter((portfolyo) => portfolyo.id !== id)
      );
      getCalendarInfo();
    } catch (err) {
      console.log("Error happened while deleting Calendar info:", err.response?.data || err.message);
    }
  };
  


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-[-120px]">
        <h1 className="font-semibold text-2xl text-black text-center mb-16">Takvim Düzenleme Formu</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="font-semibold text-xl text-black mb-5">Anime Adı</label>
          <input type="text" className="px-4 bg-slate-50 py-2" value={animeName} onChange={(e) => setAnimeName(e.target.value)} />
          <label className="font-semibold text-xl text-black mb-5">Anime Bölümü</label>
          <input type="text" placeholder="x. Bölüm" className="px-4 bg-slate-50 py-2" value={episodeOfAnime} onChange={(e) => setEpisodeOfAnime(e.target.value)} />
          <label className="font-semibold text-xl text-black mb-5">Anime Fotoğrafı</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="mb-5"></input>
          <label className="font-semibold text-xl mb-5 text-black">Anime Serisi Linki</label>
          <input type="text" placeholder="http://www.animeai.com" className="px-4 bg-slate-50 py-2" value={animeSeriesLink} onChange={(e) => setAnimeSeriesLink(e.target.value)}></input>
          <label className="font-semibold text-xl text-black mb-5">Ekleneceği Gün</label>
          <div>
            {days.map((day) => (
              <div key={day.name}>
                <input
                  type="checkbox"
                  id={day.name}
                  value={day.name}
                  checked={selectedDays.includes(day.name)}
                  onChange={() => handleCheckboxChange(day.name)}
                />
                <label htmlFor={day.name} className="text-black text-sm ml-1">
                  {day.label}
                </label>
              </div>
            ))}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Seçilen Günler:</h2>
              <p>{selectedDays.length > 0 ? selectedDays.join(', ') : 'Hiçbiri'}</p>
            </div>
          </div>
          <button className="bg-slate-900 text-white text-xl px-48 py-2 rounded-full font-semibold mt-10">Ekle</button>
        </form>
      </div>
      <div className="flex items-center justify-center h-full w-1/4 rounded mt-10 mb-20">
        <table className="w-1/4 h-full bg-slate-50">
          <thead>
            <tr>
              <th className="border py-3 px-10 md:py-6 text-xl text-center">Anime Adı</th>
              <th className="border py-3 px-10 md:py-6 text-xl text-center">Anime Bölümü</th>
              <th className="border py-3 px-10 md:py-6 text-xl text-center">Anime Günleri</th>
              <th className="border py-3 md:py-6 px-10 text-xl text-center">Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {calendar.length > 0 ? (
              calendar.map((anime, index) => (
                <tr key={anime.id || anime._id || index}>
                  <td className="border px-2 md:px-9 text-xl font-semibold py-2 md:py-4">{anime.animeName}</td>
                  <td className="border px-2 md:px-9 text-xl font-semibold py-2 md:py-4">{anime.episodeOfAnime}</td>
                  <td className="border px-2 md:px-9 text-xl font-semibold py-2 md:py-4">{anime.selectedDays.join(', ')}</td>
                  <td className="border px-2 md:px-9 text-xl font-semibold py-2 md:py-4"><button className="bg-neutral-900 text-white text-xl font-semibold px-8 py-2 rounded-lg" onClick={() => handleCalendarDelete(anime._id)}>Sil</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center font-semibold py-4">
                  Takvimde anime bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimeCalendar;
