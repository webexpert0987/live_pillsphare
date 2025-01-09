import React from 'react';
import TopHeader from "./TopHeader"
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    InputBase,
    Box,
    Container,
    Stack,
    Menu,
    MenuItem,
    Badge,
    Divider
  } from '@mui/material';
  import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Person as PersonIcon
  } from '@mui/icons-material';
  import { styled, alpha } from '@mui/material/styles';
  
  // Styled search component
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: '1px solid #ddd',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: alpha(theme.palette.common.black, 0.54),
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const MainHeader = ()=> {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return(
        <Box sx={{ flexGrow: 1 }}>
            {/* Top announcement bar */}
            <TopHeader />

            {/* Main header */}
            <AppBar position="static" color="default" elevation={1} >
                <Box sx={{marginX: '25px'}}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        {/* Navigation */}
                        <Stack direction="row" spacing={2}>
                            {['Shop', 'Online Clinic', 'Weight Loss'].map((text) => (
                                <Button
                                    key={text}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    onClick={handleClick}
                                    sx={{ color: 'text.primary' }}
                                >
                                    {text}
                                </Button>
                            ))}
                            <Button><Link to={'/about'}  sx={{ color: 'text.primary' }}>Offers</Link></Button>
                            <Button><Link to={'/about'} sx={{ color: 'text.primary' }}>Support</Link></Button>
                        </Stack>

                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 4 }}>
                            {/* <Box sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'primary.main',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1
                            }}>
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: 'primary.light',
                                    borderRadius: '50%'
                                }} />
                            </Box>
                            <Box>
                                <Typography variant="h6" component="div" sx={{ color: 'primary.dark' }}>
                                    PillSphere
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Pharmacy & Private Clinic
                                </Typography>
                            </Box> */}
                            <img src='/Pillsphere logo.png'></img>
                        </Box>

                        {/* Search, User, Cart */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>

                            <Button
                                startIcon={<PersonIcon />}
                                sx={{ color: 'text.primary' }}
                            >
                                Hi, Adam
                            </Button>

                            <IconButton color="inherit">
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    $0.00
                                </Typography>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Option 1</MenuItem>
                <MenuItem onClick={handleClose}>Option 2</MenuItem>
                <MenuItem onClick={handleClose}>Option 3</MenuItem>
            </Menu>
        </Box>
    )
}

export default MainHeader;