/* <div className="flex flex-col text-left align-text-top mb-3">
<label className="font-semibold text-2xl text-black">Animenin Açıklaması</label>
<textarea type="text" className="px-5 w-full h-64 py-5 bg-neutral-50 mt-4 rounded-md text-start align-text-top resize-none"  />
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
                  <div>
          <h3 className="font-semibold text-2xl text-black">Selected Genres:</h3>
          <ul>
            {selectedGenres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
          const [selectedGenres, setSelectedGenres] = useState([]);
        
          const handleGenreChange = (e) => {
            const selected = Array.from(e.target.selectedOptions, (option) => option.value);
            setSelectedGenres(selected);
          };