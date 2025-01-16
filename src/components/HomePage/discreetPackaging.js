import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import useScreenSize from '../../hooks/screenSizeHook';

const DiscreetPackagingSection = () => {
  const { width, height } = useScreenSize();
  
  return (
    <Container >
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          paddingLeft: {xs:'0px', sm:'2rem'},
          textAlign: 'left',
          marginY: '50px',
          display: 'flex',
          flexDirection: {xs: 'column-reverse', md: 'row'}
        }}
      >
        <Box sx={{padding: {xs:'0rem 1rem', md:'0px'}, marginBottom: {xs:'2rem', md:'0rem'}}}>
          <Typography variant="h2" sx={{fontWeight: 700, color:'tertiary.main', marginTop: '2rem'}} gutterBottom>
            Discreet Packaging
          </Typography>
          <Typography variant="h3">
            We're proud to offer fast and discreet delivery for all our medicines & treatments. So you can get your order delivered quickly, and only you'll know what's inside.
          </Typography>
          <Box>
            
            <Box marginTop={3}>
              <Stack direction={{ md: 'row', sm: 'row', xs: 'row', lg: 'row' }} gap={2} >
                <Box color={'tertiary.main'}>
                  <Icon icon="ic:outline-check-box" width="24" height="24" />
                </Box>
                <Box>
                  <Typography variant='h3' component={'span'} color='#000'> No logos</Typography>
                </Box>
              </Stack>
              <Stack direction={{ md: 'row', sm: 'row', xs: 'row', lg: 'row' }} gap={2}>
                <Box color={'tertiary.main'}>
                  <Icon icon="ic:outline-check-box" width="24" height="24" />
                </Box>
                <Box>
                  <Typography variant='h3' component={'span'} color='#000'> No mention of pharmacy</Typography>
                </Box>
              </Stack>
              <Stack direction={{ md: 'row', sm: 'row', xs: 'row', lg: 'row' }} gap={2}>
                <Box color={'tertiary.main'}>
                  <Icon icon="ic:outline-check-box" width="24" height="24" />
                </Box>
                <Box>
                  <Typography variant='h3' component={'span'} color='#000'> No description of the contents</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box>
          {width < 1080?(
              <img src='/images/discreet-packing.png' style={{width: "100%"}}/>
            )
            :
            (
              <img src='/images/discreet-packing.png' style={{ position: 'relative', bottom: '-7px'}}/>
            )
          }
        </Box>
      </Box>
    </Container>
  );
};

export default DiscreetPackagingSection;