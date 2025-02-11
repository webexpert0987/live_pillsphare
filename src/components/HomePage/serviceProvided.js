import React from "react";
import {
  Box,
  useTheme,
  Stack,
  styled,
  Typography,
  Container,
} from "@mui/material";
import { Icon } from "@iconify/react";

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const ServiceProvided = () => {
  const theme = useTheme();

  const serviceCirle = {
    width: { xs: "44px", md: "44px" },
    minWidth: { xs: "44px", md: "44px" },
    height: { xs: "44px", md: "44px" },
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"space-between"}
        sx={{
          overflow: "hidden",
          display: { xs: "flex", sm: "flex", md: "flex" },
          flexWrap: {xs: "wrap", sm: "nowrap", md: "nowrap"},
          scrollbarWidth: "none",
          padding: "10px 0 13px 0",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Item
          sx={{
            margin: { xs: "10px 0 !important", md: "16px" },
            width: { xs: "50%", md: "25%" },
            paddingRight: "10px",
          }}
        >
          <Box sx={serviceCirle}>
            <Icon
              icon="guidance:more-add-plus"
              width="22"
              height="22"
              color={theme.palette.tertiary.main}
            />
          </Box>
          <Box>
            <Typography variant={"h3"}>
              {" "}
              <strong> Regulated </strong> Pharmacy{" "}
            </Typography>
          </Box>
        </Item>
        <Item
          sx={{
            margin: { xs: "10px 0 !important", md: "16px" },
            width: { xs: "50%", md: "25%" },
            paddingRight: "10px",
          }}
        >
          <Box sx={serviceCirle}>
            <Icon
              icon="solar:star-broken"
              width="22"
              height="22"
              color={theme.palette.tertiary.main}
            />
          </Box>
          <Box>
            <Typography variant={"h3"}>
              {" "}
              <strong> Star </strong> Rating{" "}
            </Typography>
          </Box>
        </Item>
        <Item
          sx={{
            margin: { xs: "10px 0 !important", md: "16px" },
            width: { xs: "50%", md: "25%" },
            paddingRight: "10px",
          }}
        >
          <Box sx={serviceCirle}>
            <Icon
              icon="solar:box-linear"
              width="22"
              height="22"
              color={theme.palette.tertiary.main}
            />
          </Box>
          <Box>
            <Typography variant={"h3"}>
              {" "}
              <strong>Disceet </strong> Packaging{" "}
            </Typography>
          </Box>
        </Item>
        <Item
          sx={{
            margin: { xs: "10px 0 !important", md: "16px" },
            width: { xs: "50%", md: "25%" },
            paddingRight: "10px",
          }}
        >
          <Box sx={serviceCirle}>
            <Icon
              icon="hugeicons:delivery-truck-02"
              flip="horizontal"
              width="22"
              height="22"
              color={theme.palette.tertiary.main}
            />
          </Box>
          <Box>
            <Typography variant={"h3"}>
              {" "}
              <strong style={{ whiteSpace: "nowrap" }}>
                {" "}
                Free Delivery{" "}
              </strong>{" "}
              (Orders Over 20){" "}
            </Typography>
          </Box>
        </Item>
      </Stack>
    </Container>
  );
};

export default ServiceProvided;
