import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Icon } from "@iconify/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import VerticalTabs from "../productPage/Descriptiontab";
import theme from "../../Theme/theme";

const ImgText = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "20px 0px 20px 10px",
});

const StyledTab = styled(Tab)(({ theme }) => ({
  ".MuiTab-root": { fontSize: "18px" },
  display: "flex !important",
  flexDirection: "row !important",
  fontWeight: "600",
  gap: "10px",
  color: "white",
  padding: "0",
  "&.Mui-selected": {
    color: "#F5E7D1",
    fontWeight: "500",
  },
}));

const ProductOverview = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect screen size

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "32px" },
            color: "#37373F",
            fontWeight: "700",
            borderBottom: "1px solid #D3D6D9",
            paddingBottom: { xs: "15px", sm: "15px", md: "20px" },
            marginBottom: { xs: "15px", sm: "15px", md: "25px" },
            paddingTop: { xs: "10px", sm: "10px", md: "15px" },
          }}
        >
          Product Overview
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        {isMobile ? (
          // Accordion for mobile
          <>
            {[
              { title: "Description", content: <VerticalTabs /> },
              {
                title: "Information",
                content: (
                  <Typography>
                    Here is the product information, including specifications,
                    ingredients, and other relevant details.
                  </Typography>
                ),
              },
              {
                title: "Questions",
                content: (
                  <Typography>
                    Find answers to common questions about the product here.
                  </Typography>
                ),
              },
              {
                title: "Delivery",
                content: (
                  <Typography>
                    Details about shipping, delivery timelines, and return
                    policies.
                  </Typography>
                ),
              },
            ].map((tab, index) => (
              <Accordion
                key={index}
                sx={{
                  backgroundColor: "primary.main",
                  borderBottom: "1px solid #FFF",
                  fontSize: "13px",
                  fontWeight: "600",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  sx={{
                    fontWeight: "600",
                    fontSize: "15px",
                    color: "#FFF",
                  }}
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: "#FFF",
                      }}
                    />
                  }
                >
                  {tab.title}
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#FAFAFA",
                    padding: { xs: "20px", sm: "25px", md: "30px" },
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {tab.content}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          // Tabs for desktop
          <>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              sx={{
                backgroundColor: "primary.main",
                borderRadius: {
                  xs: "12px 12px 0 0",
                  sm: "12px 12px 0 0",
                  md: "12px 12px 0 0",
                },
                minHeight: "auto",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#fff",
                  minHeight: "0px",
                  height: "0",
                },
                "& .MuiTabs-scroller": {
                  overflow: {
                    xs: "scroll !important",
                    md: "hidden !important",
                  },
                  padding: "0 50px",
                },
              }}
            >
              <StyledTab
                icon={
                  <Icon
                    icon="material-symbols:description-outline-rounded"
                    width="30"
                    height="30"
                  />
                }
                label="Description"
                sx={{
                  marginRight: { xs: "0", sm: "4%", md: "5%" },
                  paddingRight: { xs: "0", sm: "4%", md: "5%" },
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: { xs: "16px", sm: "17px", md: "18px" },
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: "0",
                    color: "#FFF",
                    width: "1px",
                    height: "24px",
                    backgroundColor: "#FFF",
                  },
                }}
              />
              <StyledTab
                icon={
                  <img
                    src="/images/medicineSVG.svg"
                    width="30px"
                    height="30px"
                  />
                }
                label="Information"
                sx={{
                  marginRight: { xs: "0", sm: "4%", md: "5%" },
                  paddingRight: { xs: "0", sm: "4%", md: "5%" },
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: { xs: "16px", sm: "17px", md: "18px" },
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: "0",
                    color: "#FFF",
                    width: "1px",
                    height: "24px",
                    backgroundColor: "#FFF",
                  },
                }}
              />
              <StyledTab
                icon={
                  <EditNoteSharpIcon
                    style={{ color: "#fff" }}
                    fontSize="large"
                  />
                }
                label="Questions"
                sx={{
                  marginRight: { xs: "0", sm: "4%", md: "5%" },
                  paddingRight: { xs: "0", sm: "4%", md: "5%" },
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: { xs: "16px", sm: "17px", md: "18px" },
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: "0",
                    color: "#FFF",
                    width: "1px",
                    height: "24px",
                    backgroundColor: "#FFF",
                  },
                }}
              />
              <StyledTab
                icon={
                  <Icon
                    icon="solar:box-linear"
                    width="30"
                    height="30"
                    color="#fff"
                  />
                }
                label="Delivery"
              />
            </Tabs>

            {/* Main Content */}
            <Box
              sx={{
                backgroundColor: "#FAFAFA",
                padding: { xs: "20px", sm: "25px", md: "30px" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {tabIndex === 0 && <VerticalTabs />}
              {tabIndex === 1 && (
                <Typography
                  sx={{
                    fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Here is the product information, including specifications,
                  ingredients, and other relevant details.
                </Typography>
              )}
              {tabIndex === 2 && (
                <Typography
                  sx={{
                    fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Find answers to common questions about the product here.
                </Typography>
              )}
              {tabIndex === 3 && (
                <Typography
                  sx={{
                    fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Details about shipping, delivery timelines, and return
                  policies.
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ProductOverview;
