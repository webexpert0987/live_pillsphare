import React, { useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

const LoginRequiredPopup = ({ isOpen, onClose, redirectPath }) => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        onClose();
        navigate("/login", { state: { redirectPath } });
    };
    

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Login Required
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    You need to log in to add products to your cart.
                </Typography>
                <Box display="flex" justifyContent="center" textAlign={'center'} mt={2} gap={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoginRedirect}
                        sx={{ mr: 1 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default LoginRequiredPopup;
