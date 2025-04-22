import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./Theme/theme";
import StaticPaymentPage from "./StaticPaymentPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import MainLayout from "./layout/MainLayout";
import ZendeskWidget from "./components/ZendeskWidget";
import Sitemap from "./components/Sitemap/Sitemap";

function App() {
  return (
    <div className="App">
      <ZendeskWidget />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Sitemap route */}
            <Route path="/sitemap.xml" element={<Sitemap />} />
            
            {/* MainLayout wraps all pages */}
            <Route element={<MainLayout />}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                  exact={route.exact}
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
