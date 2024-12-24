import { Outlet } from 'react-router-dom';
import Header from '../components/admin-pages/Header.jsx';
import Sidebar from '../components/admin-pages/Sidebar.jsx';

const LayoutAdmin = () => {
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="flex flex-1">
       <Sidebar/>
        <div className="flex flex-1 items-center justify-center mt-96 ml-56">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin;