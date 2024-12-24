import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageLayout from "./layouts/HomePageLayout.jsx";
import Homepage from './components/Homepage';
import AdminPageLayout from './layouts/AdminPageLayout.jsx'
import AdminPageHome from './components/admin-pages/AdminPageHome.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminPageLayout />}>
          <Route path="/pages/admin-page-home" element={<AdminPageHome />} />
        </Route>
        <Route element={<HomePageLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
