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
    Divider,
    InputAdornment,
    TextField
  } from '@mui/material';
  import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Person as PersonIcon
  } from '@mui/icons-material';
  import { styled, alpha } from '@mui/material/styles';
  import { Icon } from '@iconify/react';


  const Text = styled(Typography)(({ theme }) => ({
    color: '#333333', textDecoration: 'none', fontWeight: 600, fontSize: theme.typography.h4.fontSize
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

  const linkTextStyle={
    color: '#333333', textDecoration: 'none', fontWeight: 600
  }

    return(
        <Box sx={{ flexGrow: 1 }}>
            {/* Top announcement bar */}
            <TopHeader />

            {/* Main header */}
            <AppBar position="static" color="default" elevation={1}>
                <Box sx={{marginX: '25px', paddingY: '10px'}}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <Stack direction="row" spacing={2}>
                            {['Shop', 'Online Clinic', 'Weight Loss'].map((text) => (
                                <Button
                                    key={text}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    onClick={handleClick}
                                    sx={{textTransform: 'capitalize'}}
                                >
                                    <Link to={'/about'} style={{textDecoration: 'none'}}>
                                        <Text>{text}</Text>
                                    </Link>
                                </Button>
                            ))}
                            <Button sx={{textTransform: 'capitalize'}}>
                                <Link to={'/about'} style={{textDecoration: 'none'}}>
                                    <Text >Offers</Text>
                                </Link>
                            </Button>
                            <Button sx={{textTransform: 'capitalize'}}>
                                <Link to={'/about'} style={{textDecoration: 'none'}}>
                                    <Text>Support</Text>
                                </Link>
                            </Button>

                        </Stack>

                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 4 }}>
                            <img src='/Pillsphere logo.png'></img>
                        </Box>

                        {/* Search, User, Cart */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                variant="standard" 
                                // variant="outlined"
                                placeholder="Search"
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon sx={{ color: 'gray' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: '250px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '50px',
                                    border: '1px solid #fff',
                                    '& .MuiOutlinedInput-root': {
                                        border: 'none',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '50px',
                                    },
                                }}
                            />

                            {/* <Button
                                startIcon={<Icon icon="mdi-light:account" width="40" height="40" />}
                                sx={{ color: 'text.primary' }}
                            >
                                
                            </Button> */}
                            
                            <Button
                                startIcon={<Icon icon="mdi-light:account" width="40" height="40" />}
                                endIcon={<KeyboardArrowDownIcon />}
                                onClick={handleClick}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                <Typography component={'span'}>|</Typography>
                                <Typography sx={{marginLeft: '3px'}} component={'span'}>Hi, Adam</Typography> 
                            </Button>

                            <IconButton color="inherit">
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                                <Typography variant="h4" sx={{ ml: 1, fontWeight: '600' }}>
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