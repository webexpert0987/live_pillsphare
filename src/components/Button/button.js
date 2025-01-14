import { Button, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";

const CustomButton = (props) =>{
    const theme = useTheme();
    return (
        <Button
            variant="contained"
            sx={{ 
                backgroundColor: props.bgColor,
                marginTop: "1.5rem",
                fontSize: theme.typography.h3.fontSize,
                [theme.breakpoints.down('md')]: {
                    fontSize: '14px',
                },
                whiteSpace: 'nowrap',
                borderRadius: '50px', padding: '10px 20px',
                textTransform: 'capitalize',
                minWidth: '150px'
            }}
        >
            {props.text} &nbsp; <Icon icon="solar:arrow-right-broken" color={props.txColor} width="22" height="22" />
        </Button>
    )
}

export default CustomButton;