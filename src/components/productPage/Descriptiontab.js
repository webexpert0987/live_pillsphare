import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import theme from "../../Theme/theme"; // Make sure to import your theme if needed

const VerticalTabs = ({ product }) => {
  const [value, setValue] = useState(0);
  const [tabContent, setTabContent] = useState([
    {
      title: "Directions",
      description: product?.directions || "No directions available.",
    },
    {
      title: "Side Effects",
      description: product?.side_effects || "No Side Effects available.",
    },
    {
      title: "Warnings",
      description: product?.warnings || "No Side Warnings available.",
    },
  ]);

  useEffect(() => {
    setTabContent([
      {
        title: "Directions",
        description: product?.directions || "No directions available.",
      },
      {
        title: "Side Effects",
        description: product?.side_effects || "No Side Effects available.",
      },
      {
        title: "Warnings",
        description: product?.warnings || "No Side Warnings available.",
      },
    ]);
  }, [product]);

  // useEffect(() => {
  //   axios
  //     .get("https://api.example.com/tabs")
  //     .then((response) => setTabContent(response.data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Detect screen size for responsive behavior
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile ? (
        // Render Accordion for mobile
        tabContent.map((tab, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "none",
              borderBottom: "1px solid #CCCCCC",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ fontWeight: "600", fontSize: "15px", color: "#333333" }}
            >
              {tab.title}
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                {tab.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        // Render Vertical Tabs for desktop
        <Box sx={{ display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            sx={{
              backgroundColor: "#FFF",
              paddingBottom: "80px",
              borderRadius: "10px",
              "& .MuiTabs-indicator": {
                width: "0",
              },
              overflow: "visible !important",
            }}
          >
            {tabContent.map((tab, index) => (
              <Tab
                key={index}
                label={tab.title}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  color: "#333333",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #CCCCCC",
                  "&.Mui-selected": {
                    color: "#FD6400",
                    fontWeight: "600",
                  },
                }}
              />
            ))}
          </Tabs>
          <Box sx={{ p: 2 }}>
            {tabContent.length > 0 && (
              <>
                <Typography variant="h6">{tabContent[value]?.title}</Typography>
                <Typography>{tabContent[value]?.description}</Typography>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VerticalTabs;
