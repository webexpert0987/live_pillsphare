import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const DiscreetPackagingSection = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: 'lightgrey', 
        padding: '2rem', 
        textAlign: 'center',
        marginY:'50px'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Discreet Packaging
      </Typography>
      <Typography variant="body1">
        We're proud to offer fast and discreet delivery for all our medicines & treatments. So you can get your order delivered quickly, and only you'll know what's inside.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        No logos <br />
        No mention of pharmacy <br />
        No description of the contents
      </Typography>
    </Box>
  );
};

export default DiscreetPackagingSection;