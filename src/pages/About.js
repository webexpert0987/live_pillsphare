import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import heroImage from "../pages/images/categoryHeroImage.jpg";
import TrustBar from "../pages/Trustbar";
import howItWorksBg from "../pages/images/Info-Images/how-it-works-bg.svg";
import ImageOne from "../pages/images/Info-Images/Acid-Reflux/Acid-Reflux01.jpg";
import ImageTwo from "../pages/images/Info-Images/Acid-Reflux/Acid-Reflux02.jpg";

import OnlinePrescriptions from "../pages/images/AboutPage/OnlinePrescriptions.jpg";

const AboutPage = () => {
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
      <Box sx={{ backgroundColor: "#F6EFDF", py: 8 }}>
      <Container>
        {/* First Section - Image Left, Content Right */}
        <Grid2 container spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <img
              src={OnlinePrescriptions}
              alt="Healthcare Services"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Your Trusted Online Pharmacy
            </Typography>
            <Typography variant="body1" sx={{ color: "#4A4A4A", lineHeight: "1.6" }}>
              At Pill Sphere, we provide safe and reliable access to prescription medications,
              over-the-counter products, and private healthcare services—all from the comfort of your home.
            </Typography>
          </Grid2>
        </Grid2>

        {/* Second Section - Content Left, Image Right */}
        <Grid2 container spacing={4} alignItems="center">
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Private Consultations and Expert Advice
            </Typography>
            <Typography variant="body1" sx={{ color: "#4A4A4A", lineHeight: "1.6" }}>
              Our experienced pharmacists and doctors offer expert medical advice and online consultations
              for various conditions, ensuring you receive the best care tailored to your needs.
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} order={{ xs: 1, md: 2 }}>
            <img
              src="https://via.placeholder.com/500"
              alt="Online Consultation"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Grid2>
        </Grid2>
      </Container>
    </Box>   
    </>
  );
};

export default AboutPage;
