import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

const heroShop = {
  heroList: {
    margin: "8px 0 8px 0",
  },
};

const HeroSection = ({
  title = "at Pill Sphere",
  defultTitle = "Pill Sphere",
  description = "Achieve your weight loss goals with our range of treatments, including tablets and injections.",
  points = [
    "Lose up to 20% of body weight",
    "Support from UK clinicians",
    "Online prescriptions with discreet delivery",
  ],
  button1Text = "Start Your Consultation Today",
  button2Text = "View Treatment",
  bgHeroUrl = "https://admin.pillsphere.com/wp-content/uploads/2025/01/categoryHeroImage.jpg",
  catName,
  weightLossHero,
}) => {
  // Check if the current page is the shop page
  const isShopPage = window.location.pathname.includes("/shop");
  if (catName === "medicine and treatment") {
    description =
      "At Pill Sphere, we offer a wide range of medications and effective treatments for various health conditions. Whether you’re managing allergies, skin conditions, or sexual health, our UK-registered pharmacists and MHRA-approved medications ensure safe, reliable care. Explore our treatments today and take control of your health!";
    points = [];
  }
  if (catName === "Vitamins and suppliments") {
    description =
      "top-quality vitamins and supplements from trusted brands like Vitabiotics, Solgar, and our exclusive Pill Sphere range. Whether you’relooking for immune support, energy boosters, or daily wellness essentials, we’ve got you covered. All our products are MHRA-approved and backed by expert advice from our UK-registered pharmacists. Shop nowand invest in your well-being!";
    points = [];
  }
  if (catName === "sexual wellbeing") {
    description =
      "At Pill Sphere, we offer trusted treatments for erectile dysfunction, contraception, and sexual health support. From Viagra and Cialis to discreet delivery and expert advice, we’re here to help you feel confident and in control. Explore our range today and prioritise your sexual health with confidence.";
    points = [];
  }
  if (catName === "Migraine") {
    description =
      "Struggling with migraines? At Pill Sphere, we offer trusted treatments to help youmanage and prevent migraine attacks. From sumatriptan to expert advice from our UK-registered pharmacists, we’re here to support you. Explore our migraine treatments today and find the relief you deserve.";
    points = [];
  }
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgHeroUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: { xs: "300px", sm: "400px", md: "450px" },
        color: "#333333",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Box
          sx={{
            width: "550px",
            maxWidth: "100%",
            paddingTop: { xs: "30px", sm: "35px", md: "50px" },
            paddingBottom: { xs: "30px", sm: "35px", md: "50px" },
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "22px", sm: "30px", md: "45px" },
              letterSpacing: "-0.5px",
              fontWeight: "800",
              lineHeight: "1.3",
              textTransform: "capitalize",
            }}
          >
            {isShopPage
              ? "Shop at Pill Sphere"
              : weightLossHero
              ? weightLossHero
              : catName
              ? `${catName} `
              : ""}
          </Typography>

          {/* Short Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              letterSpacing: "0px",
              fontWeight: { xs: "600", sm: "500", md: "500" },
              lineHeight: "1.4",
            }}
          >
            {isShopPage
              ? "Discover a wide range of prescription medications, over-the-counter products, and healthcare essentials at Pill Sphere. From allergy relief to skincare treatments, we’ve got you covered. Enjoy fast, discreet delivery and expert advice from our UK-registered pharmacists. Shop now and take the first step toward better health!"
              : description || weightLossHero || catName}
          </Typography>

          {/* List of 3 Points as Bullet Points */}
          <Box>
            {Array.isArray(points) && points.length > 0 ? (
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  marginTop: { xs: "10px", sm: "20px", md: "25px" },
                  marginBottom: { xs: "10px", sm: "15px", md: "20px" },
                }}
              >
                {points.map((point, index) => (
                  <li style={heroShop.heroList} key={index}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "15px", sm: "16px", md: "18px" },
                        letterSpacing: "0px",
                        fontWeight: "600",
                        lineHeight: "1.3",
                      }}
                    >
                      {point}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : null}
          </Box>

          {/* Two Buttons */}
          <Box
            mt={4}
            gap={2}
            sx={{
              display: { xs: "block", sm: "flex", md: "flex" },
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                fontWeight: "600",
                lineHeight: "1.4",
                backgroundColor: "#FD6400",
                color: "#FFF",
                borderRadius: "50px",
                border: "none",
                textTransform: "inherit",
                padding: {
                  xs: "12px 25px",
                  sm: "12px 20px",
                  md: "12px 25px",
                },
                boxShadow: "none",
                marginBottom: { xs: "15px", sm: "0", md: "0" },
              }}
              onClick={() => {
                if (!isShopPage) {
                  window.location.href = `/questionnaire?category=weight-loss`;
                } else {
                  window.location.href = `/online-clinic`;
                }
              }}
            >
              {button1Text}
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                fontWeight: "600",
                lineHeight: "1.4",
                backgroundColor: "#104239",
                color: "#FFF",
                borderRadius: "50px",
                border: "none",
                textTransform: "inherit",
                padding: {
                  xs: "12px 25px",
                  sm: "12px 20px",
                  md: "12px 25px",
                },
                boxShadow: "none",
              }}
              onClick={() => {
                if (!isShopPage) {
                  document.getElementById("WLTreatment")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  window.location.href = `/online-clinic`;
                }
              }}
            >
              {button2Text}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
