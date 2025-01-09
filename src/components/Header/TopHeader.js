import { useTheme } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Stack,
    Divider,
    Box
  } from '@mui/material';
import { Link } from 'react-router-dom';

const TopHeader = ()=>{
    const theme = useTheme();

    return (
        <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main, minHeight: '40px' }}>
            <Toolbar variant="dense" sx={{marginX: '30px'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box>
                        <Typography variant="body2">
                            Delivering without delay{' '}
                            <Button
                                size="small"
                                sx={{
                                    color: '#fdba74',
                                    textTransform: 'none',
                                    '&:hover': { color: '#fed7aa' },
                                }}
                            >
                                Shop now!
                            </Button>
                        </Typography>
                    </Box>
                    <Box>
                        <Stack direction="row" spacing={1}>
                            <Link to='/about' size="small"><Typography sx={{color: 'white'}}>About Us</Typography></Link>
                            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                            <Button color="inherit" size="small">How it Work</Button>
                            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                            <Button color="inherit" size="small">FAQ's</Button>
                        </Stack>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopHeader;