import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid2,
  Container,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProDefaultImg from "../../pages/images/how-it-works.jpg"; // The same image for all products

const categories = [
  {
    name: "Weight Loss",
    image: ProDefaultImg,
    link: "/online-clinic/weight-loss",
  },
  {
    name: "Acid Reflux",
    image: ProDefaultImg,
    link: "/online-clinic/acid-reflux",
  },
  {
    name: "Contraceptives",
    image: ProDefaultImg,
    link: "/online-clinic/contraceptives",
  },
  { name: "Cystitis", image: ProDefaultImg, link: "/online-clinic/cystitis" },
  {
    name: "Erectile Dysfunction",
    image: ProDefaultImg,
    link: "/online-clinic/erectile-dysfunction",
  },
  { name: "Hair Loss", image: ProDefaultImg, link: "/online-clinic/hair-loss" },
  { name: "Hay Fever", image: ProDefaultImg, link: "/online-clinic/hayfever" },
  { name: "Migraine", image: ProDefaultImg, link: "/online-clinic/migraine" },
  {
    name: "Period Delay",
    image: ProDefaultImg,
    link: "/online-clinic/period-delay",
  },
  {
    name: "Period Pain",
    image: ProDefaultImg,
    link: "/online-clinic/period-pain",
  },
  {
    name: "Premature Ejaculation",
    image: ProDefaultImg,
    link: "/online-clinic/premature-ejaculation",
  },
  {
    name: "Stop Smoking",
    image: ProDefaultImg,
    link: "/online-clinic/stop-smoking",
  },
];

const ConditionsWeTreat = () => {
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const treatStyle = {
    Wrapp: {
      padding: "70px 0",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      lineHeight: "1.4",
      color: "#333",
      textAlign: "center",
    },
    proTitle: {
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "1.4",
      color: "#FFF",
      textAlign: "left",
    },
    IngridInfo: {
      padding: "20px 22px",
      position: "absolute",
      width: "100%",
      height: "100%",
      bottom: "0",
      left: "0",
      zIndex: "3",
      background:
        "linear-gradient(20deg, #104239 10.49%, rgba(16, 66, 57, 0.50) 60.69%, rgba(148, 148, 148, 0.00) 85%)",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "end",
    },
    IngridInfoIn: {
      width: "100%",
    },
    primaryBtn: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#104239",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 25px",
      boxShadow: "none",
    },
    secondryBtn: {
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#FD6400",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 25px",
      marginTop: "10px",
      boxShadow: "none",
    },
    imgBox: {
      position: "relative",
    },
    gridBox: {
      backgroundImage: `url(${ProDefaultImg})`,
      boxShadow: "10px",
      minHeight: "150px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "none",
    },
  };

  return (
    <Box style={treatStyle.Wrapp}>
      <Container>
        <Box>
          <Typography style={treatStyle.sectionTitle} variant="h2" mb={4}>
            Conditions we treat
          </Typography>
        </Box>

        <Grid2 container spacing={4} size={{ xs: 12, sm: 12, md: 12 }}>
          {categories.slice(0, visibleCount).map((category, index) => (
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }} key={index}>
              <Card style={treatStyle.gridBox}>
                <CardActionArea
                  style={treatStyle.gridBox}
                  component={Link}
                  to={category.link}
                >
                  <CardContent style={treatStyle.IngridInfo}>
                    <Box style={treatStyle.IngridInfoIn}>
                      <Typography style={treatStyle.proTitle} variant="h6">
                        {category.name}
                      </Typography>
                      <Button
                        style={treatStyle.secondryBtn}
                        variant="contained"
                      >
                        Browse
                        <svg
                          style={{ marginLeft: "10px" }}
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {visibleCount < categories.length && (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              style={treatStyle.primaryBtn}
              variant="contained"
              color="primary"
              onClick={loadMore}
              sx={{ borderRadius: "50px", padding: "10px 20px" }}
            >
              Load More
              <svg
                style={{ marginLeft: "10px" }}
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ConditionsWeTreat;
