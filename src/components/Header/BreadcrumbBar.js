import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { getShopCategories } from "../../apis/apisList/productApi";

const BreadcrumbBar = ({ productName, categoryName }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getShopCategories();
        if (Array.isArray(response)) {
          const filterCategory = response.find(
            (cat) => cat.name == categoryName
          );
          if (filterCategory) {
            setCategory(filterCategory);
          }
        } else {
          console.error("Unexpected API response format", response);
        }
      } catch (error) {
        console.error("Error fetching shop categories", error);
      }
    };

    fetchCategories();
  }, [categoryName]);

  if (!category) return null;
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
          <Link
            component={RouterLink}
            to="/shop"
            color="inherit"
            underline="hover"
          >
            Shop
          </Link>

          <Link
            component={RouterLink}
            to={`/category/${category.slug || categoryName}`}
            color="inherit"
            underline="hover"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {category.name || categoryName}
          </Link>

          <Typography
            color="text.primary"
            sx={{
              fontSize: "14px",
              color: "#104239",
              fontWeight: "500",
            }}
          >
            {productName}
          </Typography>
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default BreadcrumbBar;
