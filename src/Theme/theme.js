import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,        // Extra small devices (phones)
      sm: 600,      // Small devices (tablets)
      md: 960,      // Medium devices (small laptops)
      lg: 1430,     // Custom large breakpoint
      xl: 1920,     // Extra large screens
      xxl: 2400,
    },
  },
  palette: {
    primary: {
      main: '#104239',  
    },
    secondary: {
      main: '#F6EFDF',
    },
    tertiary: {
        main: '#FD6400',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Urbanist', sans-serif",
    color: "#333333",
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '18px',
    },
    h4: {
      fontSize: '1rem',
    },
    body3: {
      fontSize: '22px',
      
    }
  },
});


theme.typography.h1 = {
  ...theme.typography.h1,
  [theme.breakpoints.down('md')]: {
    fontSize: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
};

theme.typography.h2 = {
  ...theme.typography.h2,
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
};

theme.typography.h3 = {
  ...theme.typography.h3,
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
};

theme.typography.h4 = {
  ...theme.typography.h4,
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
};

theme.typography.body3 = {
  ...theme.typography.body3,
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
};

export default theme;
