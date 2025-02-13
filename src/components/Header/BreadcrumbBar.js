import React from "react";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const BreadcrumbBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box
      sx={{
        borderBottom: "1px solid #CFCFCF",
      }}
    >
      <Container>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            padding: "15px 0",
            fontSize: "14px",
            color: "#757A80",
            fontWeight: "500",
          }}
        >
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </Link>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return isLast ? (
              <Typography
                key={to}
                color="text.primary"
                sx={{
                  fontSize: "14px",
                  color: "#104239",
                  fontWeight: "500",
                }}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Typography>
            ) : (
              <Link
                key={to}
                component={RouterLink}
                to={to}
                color="inherit"
                underline="hover"
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default BreadcrumbBar;
