import React, { useEffect, useState } from 'react';
import TopHeader from "./TopHeader"
import { Link, useNavigate } from 'react-router-dom';
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
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import useScreenSize from '../../hooks/screenSizeHook';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const Text = styled(Typography)(({ theme }) => ({
    color: '#333333', textDecoration: 'none', fontWeight: 600, fontSize: theme.typography.h4.fontSize
}));

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

//   const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })(({ theme }) => ({
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     variants: [
//       {
//         props: ({ open }) => open,
//         style: {
//           width: `calc(100% - ${drawerWidth}px)`,
//           marginLeft: `${drawerWidth}px`,
//           transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         },
//       },
//     ],
//   }));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const nestedListData = [
    {
        title: 'Shop',
        options: ['Option 1', 'Option 2']
    },
    {
        title: 'Online Clinic',
        options: ['Option 1', 'Option 2']
    },
    {
        title: 'Weight Loss',
        options: ['Option 1', 'Option 2']
    }
];

const MainHeader = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const { width, height } = useScreenSize();
    const [currentSize, setCurrentSize] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [isLogedIn, setIsLogedIn] = useState(false);

    const handleToggle = (index) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    useEffect(() => {
        console.log('width', width);
        if (width > 960) {
            setCurrentSize(width);
        }
    }, [width])

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoute = () => {
        navigate('/')
    }
    
    const handleLogin = () => {
        navigate('/login')
    }

    const handleSearch = (e) => {
        console.log(e.target.value)
    }

    const handleSearchClick = (e) => {
        console.log('clicked')
    }

    

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Top announcement bar */}
            <TopHeader />

            {/* Main header */}
            <AppBar position="static" color="#fff" elevation={1}>
                <Box sx={{ margin: { xs: '0px 16px 0px 10px', lg: '0px 25px' }, paddingY: '10px' }} backgroundColor='#fff'>
                    <Toolbar sx={{ justifyContent: 'space-between', paddingLeft: { xs: '0px' }, paddingRight: { xs: '0px' } }}>
                        {currentSize < 1000 ?
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={[
                                    openDrawer && { display: 'none' },
                                ]}
                            >
                                <MenuIcon />
                            </IconButton>
                            :
                            <Stack direction="row" spacing={{ xs: 0, lg: 2 }} sx={{ marginLeft: { xs: '0px', lg: '5px !important' } }}>
                                {['Shop', 'Online Clinic', 'Weight Loss'].map((text) => (
                                    <Button
                                        key={text}
                                        endIcon={<KeyboardArrowDownIcon sx={{ marginLeft: 0 }} />}
                                        onClick={handleClick}
                                        sx={{ textTransform: 'capitalize', marginRight: { xs: '0px', sm: '5px' }, marginLeft: { xs: '0px', lg: '5px !important' } }}
                                    >
                                        <Link to={'/about'} style={{ textDecoration: 'none' }}>
                                            <Text>{text}</Text>
                                        </Link>
                                    </Button>
                                ))}
                                <Button sx={{ textTransform: 'capitalize' }}>
                                    <Link to={'/about'} style={{ textDecoration: 'none' }}>
                                        <Text >Offers</Text>
                                    </Link>
                                </Button>
                                <Button sx={{ textTransform: 'capitalize' }}>
                                    <Link to={'/about'} style={{ textDecoration: 'none' }}>
                                        <Text>Support</Text>
                                    </Link>
                                </Button>

                            </Stack>
                        }
                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: { xs: 1, md: 4 }, width: { xs: '130px', sm: '220px', md: '250px', lg: '270px' } }} onClick={handleRoute}>
                            {/* <img src='/Pillsphere logo.png' style={{ width: 'inherit' }}></img> */}
                            <img src='/Pillsphere_logo-removebg-preview.png' style={{ width: 'inherit' }}></img>
                        </Box>

                        {/* Search, User, Cart */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '5px', lg: 2 } }}>
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
                                            <SearchIcon sx={{ color: 'gray' }} onClick={handleSearchClick} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: { xs: '200px', md: '250px' },
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

                            {
                                isLogedIn ?
                                    <Button
                                        startIcon={<Icon icon="mdi-light:account" width={{ xs: '25', md: "40" }} height="33" />}
                                        // endIcon={<KeyboardArrowDownIcon />}
                                        onClick={handleClick}
                                        sx={{ textTransform: 'capitalize', padding: { xs: '6px 0px 6px 8px ', lg: '16px' } }}
                                    >
                                        {
                                            !(currentSize < 1300) &&
                                            <>
                                                <Typography component={'span'}>|</Typography>
                                                <Typography sx={{ marginLeft: '3px' }} component={'span'}>Hi, Adam</Typography>
                                            </>
                                        }
                                    </Button>
                                    :
                                    <Button
                                        onClick={handleLogin}
                                        sx={{ textTransform: 'capitalize', backgroundColor: 'tertiary.main', color: 'secondaryText.main' }}
                                    >
                                        Login
                                    </Button>
                            }

                            <IconButton color="inherit" sx={{ padding: { xs: '0px', lg: '16px' } }}>
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                                {!(currentSize < 1300) &&
                                    <Typography variant="h4" sx={{ ml: 1, fontWeight: '600' }}>
                                        $0.00
                                    </Typography>
                                }
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
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
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
                        <Link to={'/about'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {/* <Text >Offers</Text> */}
                            <ListItemText primary={'Offers'} />
                        </Link>
                        {/* </Button> */}
                    </ListItemButton>
                    <ListItemButton>
                        {/* <Button sx={{textTransform: 'capitalize'}}> */}
                        <Link to={'/about'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {/* <Text >Offers</Text> */}
                            <ListItemText primary={'Support'} />
                        </Link>
                        {/* </Button> */}
                    </ListItemButton>
                </List>
                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
            {/* <DrawerHeader /> */}
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