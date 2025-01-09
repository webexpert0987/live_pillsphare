import React from 'react';
import MainHeader from '../components/Header/MainHeader';
import Footer from '../components/Footer/Footer';

import { Outlet } from 'react-router-dom';
import Carousel from '../components/HomePage/homeCarousel/carousel';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <div className="main-layout" style={{fontFamily: 'Urbanist'}}>
      <MainHeader />       
      <Carousel/>
      <Box>
        <main className="content">
          <Outlet />   
        </main>
      </Box>

      <Footer />
    </div>
  );
};

export default MainLayout;