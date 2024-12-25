import React, { useState } from 'react';

const FeaturedAnimeList = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selected);
  };

  const onSubmit = () => {
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-3xl text-black mb-10">Add Featured Animes</h1>
        <form className="flex flex-col gap-y-8">
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black">Name of Anime</label>
            <input type="text" className="rounded-md bg-slate-50 text-start align-text-top resize-none" />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black">Year of Anime</label>
            <input type="text" className="rounded-md bg-slate-50 text-start align-text-top resize-none"  />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black">Description of Anime</label>
            <input type="text" className="px-5 w-full h-64 py-5 bg-neutral-50 mt-4 rounded-md text-start align-text-top resize-none"  />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-2xl text-black">Cover of Anime</label>
            <input type="text" className="rounded-md bg-slate-50 text-start align-text-top resize-none"  />
          </div>
          <label className="font-semibold text-2xl text-black">Genres of Anime</label>
          <select multiple={true} onChange={handleGenreChange}>
            <option value="isekai">Isekai</option>
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="slice-of-life">Slice of Life</option>
          </select>
          <button className="px-44 py-4 bg-black text-2xl text-white font-semibold rounded-full">Add</button>
        </form>

        <div>
          <h3 className="font-semibold text-2xl text-black">Selected Genres:</h3>
          <ul>
            {selectedGenres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAnimeList;
