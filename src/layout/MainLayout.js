import React from "react";
import MainHeader from "../components/Header/MainHeader";
import Footer from "../components/Footer/Footer";
import ZendeskWidget from "../components/ZendeskWidget";

import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <div
      className="main-layout"
      style={{
        fontFamily: "Urbanist",
        backgroundColor: "#fff",
        color: theme.typography.color,
      }}
    >
      <MainHeader />
      <ZendeskWidget />
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
