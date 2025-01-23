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
import AddAnimeHomePage from './components/admin-pages/AddAnimeHomePage.jsx';
import AnimeHomePage from './components/AnimeHomePage.jsx';
import UserLoginPage from './components/UserLoginPage.jsx';
import UserSignUpPage from './components/UserSignUpPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import ChangeProfilePicture from './components/user-pages/ChangeProfilePicture.jsx';
import ChangeCurrentPassword from './components/user-pages/ChangeCurrentPassword.jsx';
function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route element={<AdminPageLayout />}>
          <Route path="/pages/admin-page-home" element={<AdminPageHome />} />
          <Route path="/user/adjust-featured-animes" element={<FeaturedAnimeList />} />
          <Route path="/user/edit-calendar" element={<AnimeCalendar />} />
          <Route path="/user/add-anime-home-page" element={<AddAnimeHomePage/> } />
          <Route path="/user/add-anime" element={<AddAnime />} /> 
        </Route>
        <Route element={<HomePageLayout isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} />}>
          <Route path="/" element={<Homepage isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} />} />
          <Route path="/anime-video-page" element={<AnimeVideoPage />} />
          <Route path="/anime/:id" element={<AnimeHomePage />} />
          <Route path="/anime/:id/video/:seasonNumber/:episodeNumber" element={<AnimeVideoPage />} />
          <Route path="/account/log-in" element={<UserLoginPage />} />
          <Route path="/account/sign-up" element={<UserSignUpPage />} />
          <Route path="/account/user-profile" element={<ProfilePage/>} />
          <Route path="/account/change-profile-picture" element={<ChangeProfilePicture />} />
          <Route path="/account/reset-password" element={<ChangeCurrentPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
