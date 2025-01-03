import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageLayout from "./layouts/HomePageLayout.jsx";
import Homepage from './components/Homepage';
import AdminPageLayout from './layouts/AdminPageLayout.jsx';
import AdminPageHome from './components/admin-pages/AdminPageHome.jsx';
import FeaturedAnimeList from './components/admin-pages/FeaturedAnimeList.jsx';
import AnimeCalendar from './components/admin-pages/AnimeCalendar.jsx';
import { useState } from 'react';
import Header from './components/Header.jsx';
import AnimeVideoPage from './components/AnimeVideoPage.jsx';
import AddAnime from './components/admin-pages/AddAnime.jsx';

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route element={<AdminPageLayout />}>
          <Route path="/pages/admin-page-home" element={<AdminPageHome />} />
          <Route path="/user/adjust-featured-animes" element={<FeaturedAnimeList />} />
          <Route path="/user/edit-calendar" element={<AnimeCalendar />} />
          <Route path="/user/add-anime" element={<AddAnime />} />
        </Route>
        <Route element={<HomePageLayout isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} />}>
          <Route path="/" element={<Homepage isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} />} />
          <Route path="/anime-video-page" element={<AnimeVideoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
