import React from "react";
import { Box, Container, Typography } from "@mui/material";
function MedicalReferences() {
  const MedicalReferencesData = [
    {
      id: 1,
      image: require("../../pages/images/Info-Images/NICE-Logo.png"),
      title: "National Institute for Health and Care Excellence (NICE)",
      description: "Guidelines on hair loss treatments.",
    },
    {
      id: 2,
      image: require("../../pages/images/Info-Images/BNF.jpg"),
      title: "British National Formulary (BNF)",
      description: "Information on Finasteride, Dutasteride, and Minoxidil.",
    },
    {
      id: 3,
      image: require("../../pages/images/Info-Images/MHRA.png"),
      title: "MHRA (Medicines and Healthcare products Regulatory Agency)",
      description: "Safety information for hair loss medications.",
    },
    {
      id: 4,
      image: require("../../pages/images/Info-Images/LogoSmPCs.png"),
      title: "Product Summaries of Product Characteristics (SmPCs)",
      description: "For each medication listed.",
    },
  ];

  return (
    <>
      <Box
        sx={{
          padding: { xs: "35px 0", sm: "40px 0", md: "80px 0" },
          backgroundColor: "#104239",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "22px", sm: "30px", md: "38px" },
              fontWeight: "700",
              color: "#FFF",
              lineHeight: "1.3",
              // marginBottom: "20px",
              textAlign: "center",
              marginBottom: { xs: "10px", sm: "10px", md: "10px" },
            }}
          >
            Medical References
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              fontWeight: "500",
              color: "#FFF",
              lineHeight: "1.6",
              maxWidth: "100%",
              textAlign: "center",
              marginBottom: { xs: "25px", sm: "35px", md: "50px" },
            }}
          >
            To ensure accuracy, the content is based on the following
            references:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: "30px", sm: "20px", md: "30px" },
              textAlign: "center",
            }}
          >
            {MedicalReferencesData.map((item) => (
              <Box key={item.id}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "20px", sm: "22px", md: "22px" },
                    fontWeight: "600",
                    color: "#FFF",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    color: "#FFF",
                    fontWeight: "400",
                    letterSpacing: "0.2px",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default MedicalReferences;
