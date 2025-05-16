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
// import ProDefaultImg from "../../pages/images/how-it-works.jpg"; // The same image for all products

import WeightLossImg from "../../pages/images/online-clinic/weight-loss.jpg";
import AcidRefluxImg from "../../pages/images/online-clinic/Acid-Reflux.jpg";
import ContraceptivesImg from "../../pages/images/online-clinic/Contraceptive.jpg";
import CystitisImg from "../../pages/images/online-clinic/Cystitis.jpg";
import ErectileDysfunctionImg from "../../pages/images/online-clinic/Erectile.jpg";
import HairLossImg from "../../pages/images/online-clinic/hair-loss.jpg";
import HayFeverImg from "../../pages/images/online-clinic/Hay-Fever.jpg";
import MigraineImg from "../../pages/images/online-clinic/Migraine.jpg";
import PeriodDelayImg from "../../pages/images/online-clinic/Period-Delay.jpg";
import PeriodPainImg from "../../pages/images/online-clinic/Period-Pain.jpg";
import PrematureEjaculationImg from "../../pages/images/online-clinic/Premature.jpg";
import StopSmokingImg from "../../pages/images/online-clinic/Smoking.jpg";

const categories = [
  {
    name: "Weight Loss",
    image: WeightLossImg,
    link: "/online-clinic/weight-loss",
  },
  {
    name: "Acid Reflux",
    image: AcidRefluxImg,
    link: "/online-clinic/acid-reflux",
  },
  {
    name: "Contraceptives",
    image: ContraceptivesImg,
    link: "/online-clinic/contraceptives",
  },
  { name: "Cystitis", image: CystitisImg, link: "/online-clinic/cystitis" },
  {
    name: "Erectile Dysfunction",
    image: ErectileDysfunctionImg,
    link: "/online-clinic/erectile-dysfunction",
  },
  { name: "Hair Loss", image: HairLossImg, link: "/online-clinic/hair-loss" },
  { name: "Hay Fever", image: HayFeverImg, link: "/online-clinic/hayfever" },
  { name: "Migraine", image: MigraineImg, link: "/online-clinic/migraine" },
  {
    name: "Period Delay",
    image: PeriodDelayImg,
    link: "/online-clinic/period-delay",
  },
  {
    name: "Period Pain",
    image: PeriodPainImg,
    link: "/online-clinic/period-pain",
  },
  {
    name: "Premature Ejaculation",
    image: PrematureEjaculationImg,
    link: "/online-clinic/premature-ejaculation",
  },
  {
    name: "Stop Smoking",
    image: StopSmokingImg,
    link: "/online-clinic/stop-smoking",
  },
];

const ConditionsWeTreat = () => {
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <Box sx={{
      padding: "70px 0",
    }}>
      <Container>
        <Box>
          <Typography variant="h2" mb={4} sx={{
      fontSize: "2.5rem",
      fontWeight: "700",
      lineHeight: "1.4",
      color: "#333",
      textAlign: "center",
          }}>
            Conditions we treat
          </Typography>
        </Box>

        <Grid2 container spacing={4} size={{ xs: 12, sm: 12, md: 12 }}>
          {categories.slice(0, visibleCount).map((category, index) => (
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }} key={index}>
              <Card
                sx={{
                  // boxShadow: "10px",
                  minHeight: "170px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "none",
                }}
              >
                <CardActionArea
                  component={Link}
                  to={category.link}
                >
                  <CardMedia
                    component="img"
                    height="175"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent sx={{
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
                  }}>
                    <Box sx={{
                      width: "100%",
                    }}>
                      <Typography variant="h6" sx={{
                        fontSize: "18px",
                        fontWeight: "700",
                        lineHeight: "1.4",
                        color: "#FFF",
                        textAlign: "left",
                      }}>
                        {category.name}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
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
                        }}
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
              variant="contained"
              color="primary"
              onClick={loadMore}
              sx={{
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
              }}
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
