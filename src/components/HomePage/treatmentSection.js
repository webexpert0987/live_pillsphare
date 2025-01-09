import React from "react";
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { Icon } from '@iconify/react'

const treatments = [
  {
    title: "Weight Loss",
    description:
      "Changes to diet and exercise are often combined with this medication.",
    icon: "hugeicons:body-weight",
    link: "#",
  },
  {
    title: "Mens Health",
    description:
      "Men tend to go less frequently to medical professionals to seek help...",
    icon: "solar:men-broken",
    link: "#",
  },
  {
    title: "Womens Health",
    description:
      "Women can be the most caring members of the family but can...",
    icon: "solar:women-broken",
    link: "#",
  },
  {
    title: "General Wellbeing",
    description:
      "We at the Medicus Express are passionate about encouraging a...",
    icon: "/path-to-your-general-wellbeing-icon.svg",
    link: "#",
  },
];

const TreatmentSection = () => {
  return (
      <Box
          sx={{
              backgroundColor: "#f8f2e7",
              padding: "2rem",
              textAlign: "center",
          }}
      >
          <Container>
              {/* Section Title */}
              <Typography variant="h1" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
                  Explore our treatments
              </Typography>
              <Typography variant="h3" sx={{ marginBottom: "2rem", color: "#555" }}>
                  Explore our offerings and find the perfect treatment for your goals
                  today!
              </Typography>

              {/* Cards */}
              <Box
                  sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "1.5rem",
                      marginBottom: "2rem",
                  }}
              >
                  {treatments.map((treatment, index) => (
                      <Card
                          key={index}
                          sx={{
                              width: "300px",
                              borderRadius: "16px",
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                              transition: "transform 0.3s",
                              "&:hover": {
                                  transform: "translateY(-10px)",
                              },
                          }}
                      >
                          <CardContent>
                              <Box
                                  sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginBottom: "1rem",
                                  }}
                              >
                                  {/* <img
                    src={treatment.icon}
                    alt={treatment.title}
                    style={{ width: "50px", height: "50px" }}
                    /> */}
                                  <Icon icon={treatment.icon} width="24" height="24" />
                              </Box>
                              <Typography
                                  variant="h6"
                                  sx={{
                                      fontWeight: "bold",
                                      marginBottom: "0.5rem",
                                      color: "#333",
                                  }}
                              >
                                  {treatment.title}
                              </Typography>
                              <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "1rem", color: "#777" }}
                              >
                                  {treatment.description}
                              </Typography>
                              <Typography
                                  variant="body2"
                                  sx={{
                                      color: "orange",
                                      fontWeight: "bold",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                  }}
                              >
                                  <a
                                      href={treatment.link}
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                          display: "flex",
                                          alignItems: "center",
                                      }}
                                  >
                                      Read More <span style={{ marginLeft: "0.5rem" }}>→</span>
                                  </a>
                              </Typography>
                          </CardContent>
                      </Card>
                  ))}
              </Box>

              {/* View All Button */}
              <Button
                  variant="contained"
                  sx={{
                      backgroundColor: "#254C4E",
                      color: "#fff",
                      borderRadius: "16px",
                      padding: "0.5rem 2rem",
                      textTransform: "none",
                      "&:hover": {
                          backgroundColor: "#1f3d3e",
                      },
                  }}
              >
                  View All →
              </Button>

              {/* Footer Text */}
              <Typography
                  variant="body2"
                  sx={{
                      marginTop: "2rem",
                      color: "#777",
                      fontWeight: "500",
                  }}
              >
                  Our expert team is committed to delivering effective solutions tailored
                  to help you look and feel your best.
              </Typography>
          </Container>
      </Box>
  );
};

export default TreatmentSection;
