import React from 'react';
import MainHeader from '../components/Header/MainHeader';
import Footer from '../components/Footer/Footer';

import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <div className="main-layout" style={{fontFamily: 'Urbanist'}}>
      <MainHeader />
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