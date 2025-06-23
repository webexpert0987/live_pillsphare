"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Button,
  Card,
  IconButton,
  Alert,
  GlobalStyles,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MeasurementsTab,
  FullBodyTab,
} from "../components/liveRecord/LiveRecordTabs";
import LiveRecordDialog from "../components/liveRecord/LiveRecordDialog";
import { useMessage } from "../Context/MessageContext";
import uploadFile from "../lib/fileUpload";
import { uploadLiveRecord, getOrderInfo } from "../apis/apisList/orderApi";
import { useLocation, useNavigate } from "react-router-dom";
import BackdropLoading from "../components/BackdropLoading";
import Link from "@mui/material/Link";
const primaryColor = "#104239";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function LiveRecordingVerification() {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId") || "";
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { showMessage } = useMessage();
  const onSubmit = (type) => {
    setOpen(true);
  };

  useEffect(() => {
    //get order info
    getOrderInfo(orderId).then((res) => {
      if (res.data && res.data.status === "trash") {
        showMessage("No order found", "error");
        navigate("/");
      }
    });
  }, [orderId]);

  const handleClose = () => {
    navigate("/");
  };

  const handleFileUpload = async (file) => {
    try {
      const progress = () => {};
      const url = await uploadFile(file, progress, {
        type: "video/webm",
        name: `${Date.now()}.webm`,
      });
      console.log("Upload complete:", url);
      return url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Error while uploading files");
    }
  };

  const handleSubmit = async (videoBlob) => {
    try {
      setFiles([...files, videoBlob]);
      if (tab === 0 && videoBlob) {
        showMessage("Measurement record secessfully.", "success");
        setTab(1);
        window.scrollTo({ top: 0 });
      }
      if (tab === 1 && files && files.length == 2) {
        showMessage("Full body record secessfully.", "success");
      }
    } catch (error) {
      showMessage("Internal server error", "error");
    }
  };

  const completeProcess = async (files) => {
    setLoading(true);
    try {
      let measurementVideo = await handleFileUpload(files[0]);
      let bodyVideo = await handleFileUpload(files[1]);
      await uploadLiveRecord({
        order_id: orderId,
        link: measurementVideo,
        extra_url: bodyVideo,
      });
      setLoading(false);
      showMessage(
        "Thank you! Your live recording has been successfully completed. Our team will review it shortly and get back to you via email.",
        "success"
      );
      navigate("/");
      window.scrollTo({ top: 0 });
    } catch (error) {
      showMessage("Internal server error", "error");
    }
  };

  useEffect(() => {
    if (tab === 1 && files && files.length == 2) {
      completeProcess(files);
    }
  }, [files, tab]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: isMobile ? 2 : 4,
        px: isMobile ? 1 : 3,
        // background: "linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%)",
        minHeight: "100vh",
      }}
    >
      {/* global key-frames */}
      <GlobalStyles
        styles={{
          "@keyframes pulse": {
            "0%,100%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.1)", opacity: 0.7 },
          },
          "@keyframes borderSpin": {
            to: { transform: "rotate(360deg)" },
          },
        }}
      />

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: isMobile ? 2 : 4,
          boxShadow: "0 16px 48px rgba(0,0,0,.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: isMobile ? 2 : 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: primaryColor,
              fontSize: 14,
            }}
          >
            Live-Recording Verification
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* progress bar */}
        <Box sx={{ px: isMobile ? 2 : 3, pt: 2 }}>
          <Box
            sx={{
              height: 6,
              backgroundColor: "#e0e0e0",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: tab === 0 ? "50%" : "100%",
                background: `linear-gradient(90deg, ${primaryColor} 0%, #0d3530 100%)`,
                transition: "width .5s",
              }}
            />
          </Box>
        </Box>

        {/* content */}
        <Box sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 3 : 4 }}>
          <TabPanel value={tab} index={0}>
            <MeasurementsTab onSubmit={onSubmit} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <FullBodyTab onSubmit={onSubmit} />
          </TabPanel>
          {tab === 0 && (
            <Link
              component="button"
              variant="body1"
              color="#c86300"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "40px",
                width: "100%",
              }}
              onClick={handleClose}
            >
              Close and schedule a zoom video call
            </Link>
          )}

          <LiveRecordDialog
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            tab={tab}
          />
        </Box>
      </Box>
      {loading && <BackdropLoading />}
    </Container>
  );
}
