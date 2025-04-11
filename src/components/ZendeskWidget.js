// ZendeskChatWrapper.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Link, Paper, Slide } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ZendeskChatWrapper = () => {
  const [open, setOpen] = useState(false);
  const [isBusinessHours, setIsBusinessHours] = useState(false);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours(); // 0–23
    const isLive = day >= 1 && day <= 5 && hour >= 9 && hour < 17;
    setIsBusinessHours(isLive);

    if (isLive) {
      const zendeskScript = document.createElement("script");
      zendeskScript.id = "ze-snippet";
      zendeskScript.src =
        "https://static.zdassets.com/ekr/snippet.js?key=53a56032-078b-4391-b216-4aa8a01e9c5a"; // replace with your Zendesk widget key
      zendeskScript.async = true;
      document.body.appendChild(zendeskScript);
    }
  }, []);

  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {!isBusinessHours && open && (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            sx={{
              width: {
                xs: 200, // applies to mobile
                sm: 400, // applies from small screens and up
              },
              height: 220,
              position: "fixed",
              bottom: 90,
              right: 16,
              borderRadius: 0,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              zIndex: 1000,
              opacity: open ? 1 : 0,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Pill Sphere
              </Typography>
              <Typography variant="body2" mt={1}>
                <strong>
                  Live chat is available Monday to Friday, 9 AM – 5 PM.
                </strong>
              </Typography>
              <Typography variant="body2" mt={1}>
                Right now, we’re offline—but you can still reach us at{" "}
                <Link href="mailto:zendesk@pillsphere.com">
                  zendesk@pillsphere.com
                </Link>
              </Typography>
            </Box>
            {/* <Box sx={{ textAlign: "center", fontSize: 12, color: "#aaa", pt: 1 }}>
            Built with ❤️ by Pill Sphere
          </Box> */}
          </Paper>
        </Slide>
      )}

      {/* Floating Button */}
      {!isBusinessHours && (
        <Box
          sx={{
            position: "fixed",
            bottom: 17,
            right: 17,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={toggleChat}
            sx={{
              backgroundColor: "rgb(23, 73, 77)",
              color: "white",
              width: 64,
              height: 64,
              borderRadius: "0px",
              transition: "all 0.2s ease-in-out",
              transform: open ? "scale(1.1)" : "scale(1)",
              "&:hover": {
                backgroundColor: "rgb(23, 73, 77)",
                transform: "scale(1.1)",
              },
            }}
          >
            {open ? (
              <ExpandMoreIcon
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
            ) : (
              <ChatBubbleIcon
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
            )}
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default ZendeskChatWrapper;
