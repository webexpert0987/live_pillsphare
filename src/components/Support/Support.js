import React from "react";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const supportBoxes = [
  {
    title: "Low price guarantee",
    description: [
      "At Pillsphere, we strive to provide our customers with affordable private care, exceptional service, and high-quality products. We regularly check our prices against leading competitors to ensure you're getting the best value for money... guaranteed!",
      "If you find a prescription medication at a lower price from a UK-registered and regulated online pharmacy with the same sale conditions, we will price match or refund the difference within 14 days. Take a look for yourself. We guarantee we will not be beaten on price.",
    ],
    buttonText: "Read More",
    link: "/low-price-guarantee",
  },
  {
    title: "Feedback & Complaints",
    description:
      "Here is the updated Feedback & Complaints policy with Medicus Express replaced by Pill Sphere:",
    buttonText: "Read More",
    link: "/feedback-complaints",
  },
  {
    title: "Reorder Your Prescription",
    description:
      "Make sure you're logged into your account and head over to your account section.",
    buttonText: "Read More",
    link: "/reorder-prescription",
  },
  {
    title: "Cookies Policy",
    description:
      "Please read this cookie policy (“cookie policy,” “policy”) carefully before using our website (“website,” “service”) operated by Pill Sphere LTD (“us,” “we,” “our”).",
    buttonText: "Read More",
    link: "/cookies-policy",
  },
  {
    title: "Delivery Information",
    description:
      "Prior to dispatching any orders, they must first receive approval from a prescriber. Typically, this process takes only a few hours, but occasionally it may extend to up to 24 hours from the time of order placement.",
    buttonText: "Read More",
    link: "/delivery-information",
  },
  {
    title: "Our Prescribers",
    description:
      "Shikar brings a wealth of experience and knowledge to Pill Sphere. His dedication to patient care and commitment to continual learning ensure that you receive the best possible service and support.",
    buttonText: "Read More",
    link: "/our-prescribers",
  },
  {
    title: "Privacy Policy",
    description:
      "These terms and conditions apply between you, the User of this Website (including any sub-domains, unless expressly excluded by their own terms and conditions), and Pill Sphere LTD, the owner and operator of this Website.",
    buttonText: "Read More",
    link: "/privacy-policy",
  },
  {
    title: "Refunds & Returns",
    description:
      "We understand that you may, at times, want to return an item you've purchased from us. Not all items can be returned, but for the ones that can, please read the policy below.",
    buttonText: "Read More",
    link: "/refunds-returns",
  },
  {
    title: "Terms and Conditions",
    description:
      "These terms and conditions apply between you, the User of this Website (including any sub-domains, unless expressly excluded by their own terms and conditions), and Pill Sphere LTD, the owner and operator of this Website.",
    buttonText: "Read More",
    link: "/terms-conditions",
  },
  {
    title: "Terms of Use",
    description:
      "These terms and conditions govern your use of this Website, owned and operated by Pill Sphere LTD. By accessing and using this Website, you agree to comply with these terms. If you do not agree, you must cease use immediately.",
    buttonText: "Read More",
    link: "/terms-of-use",
  },
];

function Support() {
  return (
    <>
      <ServiceProvidedDark />
      <Box
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
        }}
      >
        <Box>
          <Container>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "22px", sm: "30px", md: "32px" },
                fontWeight: "700",
                color: "#333",
                lineHeight: "1.3",
                marginBottom: "20px",
              }}
            >
              Support
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "17px" },
                fontWeight: "500",
                color: "#4A4A4A",
                lineHeight: "1.6",
                marginBottom: "10px",
              }}
            >
              Our clinical team regularly produce helpful guides to provide
              supporting information for the conditions that we treat and the
              treatments that we provide.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "16px" },
                fontWeight: "500",
                color: "#4A4A4A",
                lineHeight: "1.6",
                marginBottom: "25px",
              }}
            >
              Simply find your medical condition below to read helpful
              information written and reviewed by our healthcare professionals.
            </Typography>
          </Container>
        </Box>

        {/******************************************/}
        <Box>
          <Container sx={{ mt: 4 }}>
            <Grid2 container spacing={3}>
              {/* First row: Single column taking 50% width */}
              <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    boxShadow: "none",
                    border: "1px solid #CCC",
                    padding: {
                      xs: "15px 15px 0 15px",
                      sm: "20px 20px 10px 20px",
                      md: "30px 30px 15px 30px",
                    },
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      padding: "0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: "20px", sm: "22px", md: "24px" },
                          fontWeight: "700",
                          marginBottom: { xs: "15px", sm: "15px", md: "15px" },
                        }}
                      >
                        {supportBoxes[0].title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "15px", sm: "16px", md: "16px" },
                          fontWeight: "500",
                          lineHeight: "1.6",
                          marginBottom: { xs: "15px", sm: "15px", md: "15px" },
                        }}
                      >
                        {supportBoxes[0].description.map((text, index) => (
                          <Box
                            key={index}
                            sx={{
                              mb:
                                index !== supportBoxes[0].description.length - 1
                                  ? "20px"
                                  : 0,
                            }}
                          >
                            {text}
                          </Box>
                        ))}
                      </Typography>
                    </Box>
                    <Box>
                      <Link to={supportBoxes[0].link}>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: { xs: "14px", sm: "14px", md: "14px" },
                            fontWeight: "600",
                            lineHeight: "1.4",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            border: "none",
                            textTransform: "inherit",
                            padding: {
                              xs: "12px 15px",
                              sm: "12px 15px",
                              md: "12px 20px",
                            },
                          }}
                        >
                          {supportBoxes[0].buttonText}
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>

              {/* Second row: Two equal-width columns (each 50%) */}
              <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                <Grid2
                  size={{ xs: 12, sm: 12, md: 12 }}
                  sx={{ marginBottom: "20px" }}
                >
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "none",
                      border: "1px solid #CCC",
                      padding: {
                        xs: "15px 15px 0 15px",
                        sm: "20px 20px 10px 20px",
                        md: "30px 30px 15px 30px",
                      },
                      height: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "20px", sm: "22px", md: "24px" },
                            fontWeight: "700",
                            marginBottom: {
                              xs: "15px",
                              sm: "15px",
                              md: "15px",
                            },
                          }}
                        >
                          {supportBoxes[1].title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                            fontWeight: "500",
                            marginBottom: {
                              xs: "15px",
                              sm: "15px",
                              md: "15px",
                            },
                            lineHeight: "1.6",
                          }}
                        >
                          {supportBoxes[1].description}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: { xs: "14px", sm: "14px", md: "14px" },
                            fontWeight: "600",
                            lineHeight: "1.4",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            border: "none",
                            textTransform: "inherit",
                            padding: {
                              xs: "12px 15px",
                              sm: "12px 15px",
                              md: "12px 20px",
                            },
                          }}
                        >
                          {supportBoxes[1].buttonText}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "none",
                      border: "1px solid #CCC",
                      padding: {
                        xs: "15px 15px 0 15px",
                        sm: "20px 20px 10px 20px",
                        md: "30px 30px 15px 30px",
                      },
                      height: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "20px", sm: "22px", md: "24px" },
                            fontWeight: "700",
                            marginBottom: {
                              xs: "15px",
                              sm: "15px",
                              md: "15px",
                            },
                          }}
                        >
                          {supportBoxes[2].title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                            fontWeight: "500",
                            marginBottom: {
                              xs: "15px",
                              sm: "15px",
                              md: "15px",
                            },
                            lineHeight: "1.6",
                          }}
                        >
                          {supportBoxes[2].description}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: { xs: "14px", sm: "14px", md: "14px" },
                            fontWeight: "600",
                            lineHeight: "1.4",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            border: "none",
                            textTransform: "inherit",
                            padding: {
                              xs: "12px 15px",
                              sm: "12px 15px",
                              md: "12px 20px",
                            },
                          }}
                        >
                          {supportBoxes[2].buttonText}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>

              {/* Third row: Three equal-width columns (each 33.33%) */}
              {supportBoxes.slice(3).map((post, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 3, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "none",
                      border: "1px solid #CCC",
                      padding: {
                        xs: "15px 15px 0 15px",
                        sm: "20px 20px 10px 20px",
                        md: "30px 30px 15px 30px",
                      },
                      height: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "20px", sm: "22px", md: "24px" },
                            fontWeight: "700",
                            marginBottom: {
                              xs: "15px",
                              sm: "15px",
                              md: "15px",
                            },
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                            fontWeight: "500",
                            marginBottom: {
                              xs: "15px",
                              sm: "15px",
                              md: "15px",
                            },
                            lineHeight: "1.6",
                          }}
                        >
                          {post.description}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: { xs: "14px", sm: "14px", md: "14px" },
                            fontWeight: "600",
                            lineHeight: "1.4",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            border: "none",
                            textTransform: "inherit",
                            padding: {
                              xs: "12px 15px",
                              sm: "12px 15px",
                              md: "12px 20px",
                            },
                          }}
                        >
                          {post.buttonText}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Support;
