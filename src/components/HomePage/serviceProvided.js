import React from "react";
import { Box, useTheme, Stack, styled, Typography, Container } from "@mui/material"
import { Icon } from '@iconify/react';

const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
}));



const ServiceProvided = () =>{
    const theme = useTheme();

    const serviceCirle={
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return(
        <Container>
            <Stack direction="row" spacing={2} justifyContent={'space-between'} marginY='10px' overflow={'scroll'}>
                <Item>
                    <Box sx={serviceCirle}>
                        <Icon icon="guidance:more-add-plus" width="22" height="22" color={theme.palette.tertiary.main} />
                    </Box>
                    <Box>
                        <Typography variant={'h3'}> <strong> Regulated </strong> Pharmacy </Typography>
                    </Box>
                </Item>
                <Item>
                    <Box sx={serviceCirle}>
                        <Icon icon="solar:star-broken" width="22" height="22" color={theme.palette.tertiary.main}/>
                    </Box>
                    <Box>
                        <Typography variant={'h3'}> <strong> Star </strong> Rating </Typography>
                    </Box>
                </Item>
                <Item>
                    <Box sx={serviceCirle}>
                        <Icon icon="solar:box-linear" width="22" height="22" color={theme.palette.tertiary.main} />
                    </Box>
                    <Box>
                        <Typography variant={'h3'}> <strong>Disceet </strong> Packaging </Typography>
                    </Box>
                </Item>
                <Item>
                    <Box sx={serviceCirle}>
                        <Icon icon="hugeicons:delivery-truck-02" flip="horizontal" width="24" height="24" color={theme.palette.tertiary.main}/>
                    </Box>
                    <Box>
                        <Typography variant={'h3'}> <strong style={{whiteSpace: 'nowrap'}}> Free Delivery </strong> (Orders Over 20) </Typography>
                    </Box>
                </Item>
            </Stack>
        </Container>
    )
}

export default ServiceProvided;