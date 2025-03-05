import {
  Box,
  Button,
  Container,
  Grid2,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import heroImage from "../pages/images/categoryHeroImage.jpg";
import TrustBar from "../pages/Trustbar";
import howItWorksBg from "../pages/images/Info-Images/how-it-works-bg.svg";
import ImageOne from "../pages/images/AboutPage/AboutUs01.jpg";
import ImageTwo from "../pages/images/AboutPage/AboutUs02.jpg";

import OnlinePrescriptions from "../pages/images/AboutPage/OnlinePrescriptions.jpg";
import OTC from "../pages/images/AboutPage/OTC.jpg";
import PrivateClinic from "../pages/images/AboutPage/PrivateClinic.jpg";
import ExpertPharmacist from "../pages/images/AboutPage/ExpertPharmacist.jpg";
import FastDelivery from "../pages/images/AboutPage/Delivery.jpg";

import WhyChoosePills from "../components/CategoryInfoPages/WhyChoose";

import SafetyQualityfrom from "../pages/images/AboutPage/SafetyQuality.jpg";
import Mission from "../pages/images/AboutPage/mission.png";

import useScreenSize from "../hooks/screenSizeHook";

const AboutPage = () => {
  const { width, height } = useScreenSize();
  return (
    <>
      {/************** Hero Section **************/}
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
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
              width: { xs: "100%", sm: "600px", md: "700px" },
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
              }}
            >
              About Pill Sphere
            </Typography>

            {/* SubTitle */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                letterSpacing: "0px",
                fontWeight: { xs: "600", sm: "700", md: "700" },
                marginBottom: { xs: "10px", sm: "15px", md: "15px" },
                lineHeight: "1.4",
              }}
            >
              Your Trusted Online Pharmacy and Private Clinic
            </Typography>

            {/* Paragraph Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                letterSpacing: "0px",
                fontWeight: { xs: "600", sm: "500", md: "500" },
                lineHeight: "1.4",
              }}
            >
              Welcome to Pill Sphere, your trusted online pharmacy and private
              clinic in the UK. We are committed to providing safe, convenient,
              and reliable access to medications and healthcare services, all
              from the comfort of your home. Whether you need prescription
              medications, over-the-counter products, or expert medical advice,
              Pill Sphere is here to support your health and well-being.
            </Typography>

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
                onClick={() =>
                  (window.location.href = `/questionnaire?category=acid-reflux`)
                }
              >
                Start Your Consultation Today
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
                onClick={() => (window.location.href = `#Treatment`)}
              >
                View Treatment
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** What is Acid Reflux? **************/}
      <Container>
        <Box
          sx={{
            maxWidth: "100%",
            margin: "auto",
            padding: {
              xs: "30px 0 30px 0",
              sm: "50px 0 70px 0",
              md: "70px 0 90px 0",
            },
          }}
        >
          <Grid2 container spacing={0}>
            {/* Left Column */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 5 }}
              spacing={2}
              sx={{
                position: "relative",
              }}
            >
              <Grid2 container spacing={0}>
                <Grid2 item xs={12} sm={6} md={5}>
                  <Box
                    component="img"
                    src={howItWorksBg}
                    sx={{
                      position: "absolute",
                      right: "20px",
                      top: "40px",
                      display: { xs: "none", sm: "block", md: "block" },
                    }}
                  />
                  <Box
                    component="img"
                    src={ImageOne}
                    sx={{
                      maxWidth: "100%",
                      borderRadius: "20px",
                      zIndex: "1",
                      position: "relative",
                    }}
                  />
                  <Box
                    component="img"
                    src={ImageTwo}
                    sx={{
                      maxWidth: "100%",
                      position: "absolute",
                      right: "0",
                      bottom: "-30px",
                      borderRadius: "20px",
                      zIndex: "2",
                      display: { xs: "none", sm: "block", md: "block" },
                    }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            {/* Right Column */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 7 }}
              spacing={2}
              sx={{
                padding: {
                  xs: "20px 0 0 0px",
                  sm: "30px 0 0 50px",
                  md: "30px 0 0 80px",
                },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: "22px", sm: "30px", md: "32px" },
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1.3",
                  marginBottom: "20px",
                }}
              >
                Who We Are
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                  color: "#4A4A4A",
                  lineHeight: "1.6",
                  marginBottom: "25px",
                }}
              >
                Pill Sphere is a GPhC-registered online pharmacy and private
                clinic, fully compliant with the standards set by the General
                Pharmaceutical Council (GPhC) and the Medicines and Healthcare
                products Regulatory Agency (MHRA). Our mission is to make
                healthcare accessible, affordable, and hassle-free for everyone
                in the UK.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                  color: "#4A4A4A",
                  lineHeight: "1.6",
                  marginBottom: "25px",
                }}
              >
                With a team of qualified pharmacists, doctors, and healthcare
                professionals, we combine clinical expertise with a
                patient-centered approach to deliver the highest standard of
                care. Whether you're managing a chronic condition, seeking
                treatment for a minor ailment, or looking for expert advice, you
                can trust Pill Sphere to provide the support you need.
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
      {/************** Services Vertical Tab **************/}
      <Box
        sx={{
          backgroundColor: "#F6EFDF",
          padding: {
            xs: "30px 0 30px 0",
            sm: "50px 0 50px 0",
            md: "70px 0 70px 0",
          },
        }}
      >
        <Container>
          {/* First Section - Image Left, Content Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              marginBottom: {
                xs: "25px",
                sm: "30px",
                md: "35px",
              },
              padding: {
                xs: "0",
                sm: "0 10% 0 10%",
                md: "0 10% 0 10%",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <img
                src={OnlinePrescriptions}
                alt="Online Prescriptions"
                style={{ width: "100%", borderRadius: "15px 100px 15px 15px" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                paddingLeft: { xs: "0", sm: "30px", md: "40px" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                01. Your Trusted Online Pharmacy
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Need a prescription? Our private online consultations make it
                easy. Simply complete a quick health questionnaire, and one of
                our registered doctors or pharmacists will review your
                information. If appropriate, a prescription will be issued, and
                your medication will be dispensed and delivered to your
                doorstep.
              </Typography>
            </Grid2>
          </Grid2>

          {/* Second Section - Content Left, Image Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              marginBottom: {
                xs: "25px",
                sm: "30px",
                md: "35px",
              },
              padding: {
                xs: "0",
                sm: "0 10% 0 10%",
                md: "0 10% 0 10%",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 9, md: 9 }} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                2. Over-the-Counter (OTC) Products
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                We stock a wide range of OTC medications, including allergy
                relief, painkillers, cold and flu treatments, and skincare
                products. Browse our online shop to find the products you need.
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }} order={{ xs: 1, md: 2 }}>
              <img
                src={OTC}
                alt="Over-the-Counter"
                style={{ width: "100%", borderRadius: "100px 15px 15px 15px" }}
              />
            </Grid2>
          </Grid2>

          {/* Three Section - Image Left, Content Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              marginBottom: {
                xs: "25px",
                sm: "30px",
                md: "35px",
              },
              padding: {
                xs: "0",
                sm: "0 10% 0 10%",
                md: "0 10% 0 10%",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <img
                src={PrivateClinic}
                alt="Private Clinic"
                style={{ width: "100%", borderRadius: "15px 100px 15px 15px" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                paddingLeft: { xs: "0", sm: "30px", md: "40px" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                03. Private Clinic Services
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Our private clinic offers consultations and treatments for a
                variety of conditions, including:
                <ul className="infoList2">
                  <li>
                    Sexual health (e.g., erectile dysfunction, contraception){" "}
                  </li>
                  <li>Weight management </li>
                  <li>General health concerns (e.g. hair loss) </li>
                  <li>And many more </li>
                </ul>
              </Typography>
            </Grid2>
          </Grid2>

          {/* Four Section - Content Left, Image Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              marginBottom: {
                xs: "25px",
                sm: "30px",
                md: "35px",
              },
              padding: {
                xs: "0",
                sm: "0 10% 0 10%",
                md: "0 10% 0 10%",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 9, md: 9 }} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                4. Expert Pharmacist Advice
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Have a question about your medication or treatment? Our
                UK-registered pharmacists are available to provide expert advice
                and support. Contact us via phone, email, or live chat for
                assistance.
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }} order={{ xs: 1, md: 2 }}>
              <img
                src={ExpertPharmacist}
                alt="Over-the-Counter"
                style={{ width: "100%", borderRadius: "100px 15px 15px 15px" }}
              />
            </Grid2>
          </Grid2>

          {/* Five Section - Image Left, Content Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              marginBottom: {
                xs: "25px",
                sm: "30px",
                md: "35px",
              },
              padding: {
                xs: "0",
                sm: "0 10% 0 10%",
                md: "0 10% 0 10%",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <img
                src={FastDelivery}
                alt="Online Prescriptions"
                style={{ width: "100%", borderRadius: "15px 100px 15px 15px" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                paddingLeft: { xs: "0", sm: "30px", md: "40px" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                05. Fast, Discreet Delivery
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                We understand the importance of privacy and convenience. That's
                why we offer fast, discreet delivery across the UK. Most orders
                are dispatched within 24 hours and delivered within 2-3 working
                days.
              </Typography>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/************** Why Choose Pill Sphere? **************/}
      <WhyChoosePills />

      {/************** Our Commitment to Safety and Quality **************/}
      <Box sx={{ backgroundColor: "#F6EFDF" }}>
        <Container>
          <Box
            sx={{
              maxWidth: "100%",
              margin: "auto",
              padding: {
                xs: "30px 0 30px 0",
                sm: "50px 0 50px 0",
                md: "70px 0 70px 0",
              },
            }}
          >
            <Grid2
              container
              spacing={0}
              sx={{
                alignItems: "center",
              }}
            >
              {/* Left Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 4 }}
                spacing={2}
                sx={{
                  position: "relative",
                }}
              >
                <Grid2 container spacing={0}>
                  <Grid2 item xs={12} sm={5} md={4}>
                    <Box
                      component="img"
                      src={SafetyQualityfrom}
                      sx={{
                        maxWidth: "100%",
                        borderRadius: "20px",
                        zIndex: "1",
                        position: "relative",
                      }}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>

              {/* Right Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 8 }}
                spacing={2}
                sx={{
                  padding: {
                    xs: "20px 0 0 0px",
                    sm: "10px 0 0 50px",
                    md: "30px 0 0 80px",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "22px", sm: "26px", md: "32px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  Our Commitment to Safety and Quality
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    fontWeight: "500",
                    color: "#4A4A4A",
                    lineHeight: "1.6",
                    marginBottom: "25px",
                  }}
                >
                  At Pill Sphere, your safety is our top priority. We adhere to
                  strict guidelines set by the General Pharmaceutical Council
                  (GPhC) and the Medicines and Healthcare products Regulatory
                  Agency (MHRA). This ensures that all our medications are safe,
                  effective, and of the highest quality.
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    fontWeight: "500",
                    color: "#4A4A4A",
                    lineHeight: "1.6",
                    marginBottom: "25px",
                  }}
                >
                  We also comply with UK data protection laws (GDPR), ensuring
                  that your personal and medical information is handled with the
                  utmost care and confidentiality.
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>

      {/************** Our Mission **************/}
      <Box>
          <Container>
            <Box
              sx={{
                backgroundColor: "#104239",
                paddingLeft: { xs: "0px", sm: "2rem" },
                textAlign: "left",
                marginY: { xs: "30px", sm: "35px", md: "50px" },
                display: "flex",
                borderRadius: "12px",
                overflow: "hidden",
                flexDirection: { xs: "column-reverse", md: "row" },
                alignItems: "center"
              }}
            >
              <Box
                sx={{
                  padding: { xs: "0px 20px", md: "0rem 1rem" },
                  marginBottom: { xs: "2rem", md: "0rem" },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "22px", md: "32px" },
                    fontWeight: 700,
                    color: "#FFF",
                    paddingTop: { xs: "30px", sm: "0", md: "0" },
                  }}
                  gutterBottom
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "500",
                    lineHeight: "1.5",
                    color: "#FFF",
                  }}
                >
                  Our mission is to make healthcare accessible, affordable, and
                  convenient for everyone in the UK. We believe that everyone
                  deserves access to high-quality medications and expert medical
                  advice, without the hassle of visiting a physical pharmacy or
                  clinic.
                </Typography>
              </Box>
              <Box sx={{
                display: {xs: "none", sm: "block", md: "block"}
              }}>
                {width < 1080 ? (
                  <img
                    src={Mission}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <img
                    src={Mission}
                    style={{ position: "relative", bottom: "-7px" }}
                  />
                )}
              </Box>
            </Box>
          </Container>
      </Box>
    </>
  );
};

export default AboutPage;
