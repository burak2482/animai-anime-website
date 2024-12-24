import React from 'react';
import Header from '../components/Header.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const LayoutPortfolyo = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default LayoutPortfolyo;
