import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const TopHeader = () => {
  const theme = useTheme();
  const linkStyle = { color: "white", textDecoration: "none" };
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.primary.main,
        minHeight: "40px",
        padding: "1px",
      }}
    >
      <Toolbar variant="dense" sx={{ marginX: { xs: "0px", md: "35px" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h4">
              Delivering without delay{" "}
              <Button
                sx={{
                  color: "tertiary.main",
                  textTransform: "none",
                  fontSize: "inherit",
                  padding: "0px",
                }}
                onClick={() => (window.location.href = `/shop`)}
              >
                Shop now!
              </Button>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Stack direction="row" spacing={1}>
              <Link to="/about" style={linkStyle}>
                <Typography variant="h4">About Us</Typography>
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
              />
              <Link to="/how-it-work" style={linkStyle}>
                <Typography variant="h4">How it Work</Typography>
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
              />
              <Link to="/faqs" style={linkStyle}>
                <Typography variant="h4">FAQ's</Typography>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopHeader;
