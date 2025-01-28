import React from "react";
import { Box, Container, Typography, Grid2 } from "@mui/material";
import RegulatedIcon from "./images/regulated-icon.svg";
import StarIcon from "./images/star-icon.svg";
import PackingIcon from "./images/packing-icon.svg";
import DeliveryIcon from "./images/delivery-icon.svg";

const trustStyle = {
  TrustWrapper: {
    backgroundColor: "#104239",
    padding: '16px 0'
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    padding: 2,
    borderRadius: 0,
  },
  iconImg: {
    padding: 2,
    borderRadius: 2,
    backgroundColor: "#F6EFDF",
  },
  iconTitle: {
    color: "#FFF",
    fontSize: '18px',
  },
  imgDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#F6EFDF",
    width: "46px",
    height: "46px",
    padding: "4px",
    borderRadius: '50px',
    marginRight: '15px'
  },
};

const TrustBar = () => {
  return (
    <Box style={trustStyle.TrustWrapper}>
      <Container>
        <Box sx={{ padding: 0 }}>
          <Grid2 container spacing={4}>
            {/* Column 1 */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Box style={trustStyle.iconBox}>
                <Box style={trustStyle.imgDiv}>
                  <Box
                    style={trustStyle.iconImg}
                    component="img"
                    src={RegulatedIcon}
                    alt="Regulated Pharmacy"
                  />
                </Box>
                <Typography style={trustStyle.iconTitle} variant="body1">
                  <Box component="span" fontWeight="bold">
                    Regulated
                  </Box>{" "}
                  Pharmacy
                </Typography>
              </Box>
            </Grid2>

            {/* Column 2 */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Box style={trustStyle.iconBox}>
                <Box style={trustStyle.imgDiv}>
                  <Box
                    style={trustStyle.iconImg}
                    component="img"
                    src={StarIcon}
                    alt="5 Star Rating"
                  />
                </Box>
                <Typography style={trustStyle.iconTitle} variant="body1">
                  <Box component="span" fontWeight="bold">
                    5 Star
                  </Box>{" "}
                  Rating
                </Typography>
              </Box>
            </Grid2>

            {/* Column 3 */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Box style={trustStyle.iconBox}>
                <Box style={trustStyle.imgDiv}>
                  <Box
                    style={trustStyle.iconImg}
                    component="img"
                    src={PackingIcon}
                    alt="Discreet Packaging"
                  />
                </Box>
                <Typography style={trustStyle.iconTitle} variant="body1">
                  <Box component="span" fontWeight="bold">
                    Discreet
                  </Box>{" "}
                  Packaging
                </Typography>
              </Box>
            </Grid2>

            {/* Column 4 */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Box style={trustStyle.iconBox}>
                <Box style={trustStyle.imgDiv}>
                  <Box
                    style={trustStyle.iconImg}
                    component="img"
                    src={DeliveryIcon}
                    alt="Free Delivery"
                  />
                </Box>
                <Typography style={trustStyle.iconTitle} variant="body1">
                  <Box component="span" fontWeight="bold">
                    Free Delivery
                  </Box>{" "}
                  (Orders Over £20)
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default TrustBar;
