import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Menu,
  MenuItem,
  Badge,
  Divider,
  InputAdornment,
  TextField,
  useTheme,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogContent,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import useScreenSize from "../../hooks/screenSizeHook";

import Collapse from "@mui/material/Collapse";
import { useApp } from "../../Context/AppContext";
import AddToCartModal from "../addToCart/addToCartModal";
import { getShopCategories } from "../../apis/apisList/productApi";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"; //

const Text = styled(Typography)(({ theme }) => ({
  color: "#333333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: theme.typography.h4.fontSize,
}));

const drawerWidth = 240;

const product = {
  id: 187,
  name: "Spedra (avanafil) 50mg",
  image: "http://sdf.com/wp-content/uploads/2025/01/spedra_avanafil.jpg",
  variations: [
    { variation_id: 188, price: "19.99", attributes: { tablets: "4 Tablets" } },
    { variation_id: 189, price: "28.99", attributes: { tablets: "8 Tablets" } },
    {
      variation_id: 190,
      price: "49.99",
      attributes: { tablets: "16 Tablets" },
    },
    {
      variation_id: 191,
      price: "79.99",
      attributes: { tablets: "24 Tablets" },
    },
  ],
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const nestedListData = [
  {
    title: "Shop",
    options: ["Option 1", "Option 2"],
  },
  {
    title: "Online Clinic",
    options: ["Option 1", "Option 2"],
  },
  {
    title: "Weight Loss",
    options: ["Option 1", "Option 2"],
  },
];

const onlineClinicItems = [
  { id: 1, name: "Weight Loss", link: "/online-clinic/weight-loss" },
  { id: 2, name: "Acid Reflux", link: "/online-clinic/acid-reflux" },
  {
    id: 3,
    name: "Contraceptives",
    link: "/online-clinic/contraceptives",
  },
  { id: 4, name: "Cystitis", link: "/online-clinic/cystitis" },
  {
    id: 5,
    name: "Erectile Dysfunction",
    link: "/online-clinic/erectile-dysfunction",
  },
  { id: 6, name: "Hair Loss", link: "/online-clinic/hair-loss" },
  { id: 7, name: "Hay Fever", link: "/online-clinic/hayfever" },
  {
    id: 8,
    name: "Migraine",
    link: "/online-clinic/migraine",
  },
  { id: 9, name: "Period Delay", link: "/online-clinic/period-delay" },
  { id: 10, name: "Period Pain", link: "/online-clinic/period-pain" },
  {
    id: 11,
    name: "Premature Ejaculation",
    link: "/online-clinic/premature-ejaculation",
  },
  { id: 12, name: "Stop Smoking", link: "/online-clinic/stop-smoking" },
];

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginDrop, setLoginDrop] = React.useState(null);
  const open = Boolean(anchorEl);
  const openLogin = Boolean(loginDrop);
  const navigate = useNavigate();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { width, height } = useScreenSize();
  const [currentSize, setCurrentSize] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { userDetails, logout, calculateTotal } = useApp();
  const [openCartModel, setOpenCartModel] = useState(false);
  const [shopCategories, setShopCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [onlineClinicAnchorEl, setOnlineClinicAnchorEl] = useState(null);
  const onlineClinicOpen = Boolean(onlineClinicAnchorEl);

  const handleOnlineClinicClose = () => {
    setOnlineClinicAnchorEl(null);
  };

  const handleOnlineClinicClick = () => {};

  const handleToggle = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getShopCategories();
        if (Array.isArray(response)) {
          setShopCategories(response);
        } else {
          console.error("Unexpected API response format", response);
        }
      } catch (error) {
        console.error("Error fetching shop categories", error);
      }
    };

    fetchCategories();
  }, []);

  const topCategories = shopCategories.filter((cat) => cat.parent === 0);
  const getSubcategories = (parentId) =>
    shopCategories.filter((cat) => cat.parent === parentId);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  useEffect(() => {
    if (width > 960) {
      setCurrentSize(width);
    }
  }, [width]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleClick = (event, text) => {
    if (text === "Shop") {
      setAnchorEl(event.currentTarget);
    } else {
      setOnlineClinicAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = (event) => {
    setLoginDrop(event.currentTarget);
  };

  const handleLoginClose = () => {
    setLoginDrop(null);
  };

  const handleLogout = () => {
    setLoginDrop(null);
    logout();
    navigate("/login");
  };

  const handorderHitory = () => {
    // Perform your logout logic here (e.g., clearing local storage, etc.)
    // Then, navigate to the order history page
    navigate("/order-history");
  };

  const handleRoute = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSearchClick = (e) => {};

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const handleSearch = () => {
    console.log("Searching for:", searchQuery); // Replace with actual search logic
    if (isMobile) closeSearch(); // Close only on mobile
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top announcement bar */}
      <TopHeader />

      {/* Main header */}
      <AppBar position="static" color="#fff" elevation={1}>
        <Box
          sx={{
            padding: {
              xs: "0px 16px 0px 10px",
              sm: "10px 40px",
              md: "10px 40px",
              lg: "10px 40px",
            },
          }}
          backgroundColor="#fff"
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              paddingLeft: { xs: "0px" },
              paddingRight: { xs: "0px" },
            }}
          >
            {currentSize < 1000 ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[openDrawer && { display: "none" }]}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack
                direction="row"
                spacing={{ xs: 0, lg: 2 }}
                sx={{
                  marginLeft: { xs: "0px", lg: "5px !important" },
                  width: { xs: "auto", sm: "10%", md: "42%" },
                }}
              >
                {["Shop", "Online Clinic", "Weight Loss"].map((text) => (
                  <Button
                    key={text}
                    endIcon={
                      text === "Shop" || text === "Online Clinic" ? (
                        <KeyboardArrowDownIcon
                          sx={{ marginLeft: 0 }}
                          onClick={(e) => handleClick(e, text)}
                        />
                      ) : null
                    }
                    sx={{
                      textTransform: "capitalize",
                      marginRight: { xs: "0px", sm: "5px" },
                      marginLeft: { xs: "0px", lg: "5px !important" },
                    }}
                  >
                    <Link
                      to={
                        text === "Shop"
                          ? "/shop"
                          : text === "Online Clinic"
                          ? "/online-clinic"
                          : "/online-clinic/weight-loss"
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <Text>{text}</Text>
                    </Link>
                  </Button>
                ))}
                <Button sx={{ textTransform: "capitalize" }}>
                  <Link to={"/offers"} style={{ textDecoration: "none" }}>
                    <Text>Offers</Text>
                  </Link>
                </Button>

                <Button sx={{ textTransform: "capitalize" }}>
                  <Link to={"/support"} style={{ textDecoration: "none" }}>
                    <Text>Support</Text>
                  </Link>
                </Button>
              </Stack>
            )}
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                mx: { xs: 1, md: 4 },
                width: { xs: "auto", sm: "30%", md: "16%" },
                //width: { xs: "160px", sm: "220px", md: "250px", lg: "270px" },
              }}
              onClick={handleRoute}
            >
              {/* <img src='/Pillsphere logo.png' style={{ width: 'inherit' }}></img> */}
              <img
                src="/Pillsphere_logo-removebg-preview.png"
                style={{ width: "auto", maxWidth: "100%" }}
              ></img>
            </Box>

            {/* Search, User, Cart */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: { xs: "5px", lg: 2 },
                width: { xs: "auto", sm: "60%", md: "42%" },
              }}
            >
              <div>
                {isMobile ? (
                  // Mobile View: Search Icon + Popup
                  <>
                    <IconButton onClick={openSearch} color="primary">
                      <SearchIcon />
                    </IconButton>

                    <Dialog
                      open={isSearchOpen}
                      onClose={closeSearch}
                      maxWidth="sm"
                      fullWidth
                    >
                      <DialogContent>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          sx={{ padding: 1 }}
                        >
                          <InputBase
                            fullWidth
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSearch()
                            }
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              padding: "8px 12px",
                              flex: 1,
                            }}
                          />
                          <IconButton onClick={handleSearch} color="primary">
                            <KeyboardReturnIcon />
                          </IconButton>
                          <IconButton onClick={closeSearch} color="secondary">
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  // Desktop View: Normal Search Bar
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      backgroundColor: "#F7F7F7",
                      border: "1px solid #F7F7F7",
                      borderRadius: "50px",
                      padding: "6px 10px 6px 20px",
                      maxWidth: "210px",
                      width: "100%",
                    }}
                  >
                    <InputBase
                      fullWidth
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <IconButton onClick={handleSearch} color="primary">
                      <SearchIcon sx={{ marginRight: "8px" }} />
                    </IconButton>
                  </Box>
                )}
              </div>
              {/** Search Comment 
              <TextField
                variant="standard"
                // variant="outlined"
                placeholder="Search"
                fullWidth
                onChange={handleSearch}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        sx={{ color: "gray" }}
                        onClick={handleSearchClick}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "200px", md: "250px" },
                  backgroundColor: "#f9f9f9",
                  borderRadius: "50px",
                  border: "1px solid #fff",
                  padding: "10px 15px",
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />*/}

              {/* <Button
                                startIcon={<Icon icon="mdi-light:account" width="40" height="40" />}
                                sx={{ color: 'text.primary' }}
                            >
                                
                            </Button> */}

              {userDetails ? (
                <Button
                  startIcon={
                    <Icon
                      icon="mdi-light:account"
                      width={{ xs: "25", md: "40" }}
                      height="33"
                    />
                  }
                  // endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleLoginClick}
                  sx={{
                    textTransform: "capitalize",
                    padding: { xs: "6px 0px 6px 8px ", lg: "16px" },
                  }}
                >
                  {!(currentSize < 1300) && (
                    <>
                      <Typography component={"span"}>|</Typography>
                      <Typography sx={{ marginLeft: "3px" }} component={"span"}>
                        Hi, {userDetails.first_name}
                      </Typography>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleLogin}
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "tertiary.main",
                    color: "secondaryText.main",
                    borderRadius: "50px",
                    padding: "10px 20px",
                  }}
                >
                  Login
                </Button>
              )}

              <IconButton
                color="inherit"
                sx={{ padding: { xs: "0px", lg: "16px" } }}
                onClick={() => setOpenCartModel(true)}
              >
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
                {!(currentSize < 1300) && (
                  <Typography variant="h4" sx={{ ml: 1, fontWeight: "600" }}>
                    £{calculateTotal()}
                  </Typography>
                )}
              </IconButton>
              <AddToCartModal
                open={openCartModel}
                onClose={() => setOpenCartModel(false)}
                // product={product}
              />
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //     <ListSubheader component="div" id="nested-list-subheader">
          //         Services
          //     </ListSubheader>
          // }
        >
          {nestedListData.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleToggle(index)}>
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemText primary={item.title} />
                {openSections[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSections[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.options.map((option, optIndex) => (
                    <ListItemButton key={optIndex} sx={{ pl: 4 }}>
                      {/* <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon> */}
                      <ListItemText primary={option} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
          <ListItemButton>
            {/* <Button sx={{textTransform: 'capitalize'}}> */}
            <Link
              to={"/offers"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* <Text >Offers</Text> */}
              <ListItemText primary={"Offers"} />
            </Link>
            {/* </Button> */}
          </ListItemButton>
          <ListItemButton>
            {/* <Button sx={{textTransform: 'capitalize'}}> */}
            <Link
              to={"/support"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* <Text >Offers</Text> */}
              <ListItemText primary={"Support"} />
            </Link>
            {/* </Button> */}
          </ListItemButton>
        </List>
      </Drawer>
      {/* <DrawerHeader /> */}
      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {topCategories.map((category) => {
          const subcategories = getSubcategories(category.id);

          return (
            <div key={category.id}>
              <MenuItem onClick={() => handleCategoryClick(category.id)}>
                <Link
                  to={`/category/${category.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    flex: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {category.name}
                </Link>
                {subcategories.length > 0 ? (
                  selectedCategory === category.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </MenuItem>

              {selectedCategory === category.id &&
                subcategories.map((sub) => (
                  <MenuItem key={sub.id} style={{ paddingLeft: 20 }}>
                    <Link
                      to={`/category/${sub.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        textTransform: "capitalize",
                      }}
                    >
                      {sub.name}
                    </Link>
                  </MenuItem>
                ))}
            </div>
          );
        })}
      </Menu>
      <Menu
        anchorEl={loginDrop}
        open={openLogin}
        onClose={handleLoginClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLoginClose}>User profile</MenuItem>
        <MenuItem onClick={handorderHitory}>Order history</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/* Dropdown Menu for Online Clinic */}
      <Menu
        anchorEl={onlineClinicAnchorEl}
        open={onlineClinicOpen}
        onClose={handleOnlineClinicClose}
      >
        {onlineClinicItems.map((item) => (
          <Link
            to={item.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem key={item.id} onClick={handleOnlineClinicClose}>
              {item.name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default MainHeader;
