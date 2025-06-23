import { useState } from "react";
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
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  Lock as LockIcon,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";

const primaryColor = "#104239";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
export function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

function CustomStepIcon({ number }) {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${primaryColor} 0%, #0d3530 100%)`,
        color: "white",
        fontSize: 18,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 4px 14px rgba(16,66,57,.35)`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -6,
          borderRadius: "50%",
          background: `${primaryColor}22`,
          animation: "pulse 2.5s ease-in-out infinite",
        },
      }}
    >
      {number}
    </Box>
  );
}

function InteractiveVideoCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        mb: 4,
        borderRadius: 3,
        maxWidth: "100%",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform .35s",
        boxShadow: hovered
          ? "0 14px 32px rgba(16,66,57,.28)"
          : "0 6px 18px rgba(0,0,0,.1)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          pt: "56.25%",
          backgroundImage: "url(/manStand.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%) scale(1)",
            transition: "all .3s",
            width: 68,
            height: 68,
            backgroundColor: hovered ? primaryColor : "white",
            color: hovered ? "white" : primaryColor,
            "&:hover": { backgroundColor: primaryColor },
            boxShadow: "0 8px 18px rgba(0,0,0,.18)",
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 38, ml: 0.5 }} />
        </IconButton>
      </Box>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab 1 – Measurements                                              */
/* ------------------------------------------------------------------ */
export function MeasurementsTab({ onSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const steps = [
    {
      title: "Introduce Yourself",
      desc: "Say your full name, date of birth, and today's date.",
    },
    {
      title: "Confirm Measurements",
      desc: "State your weight and height, then show the scale display.",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 2,
          textAlign: "center",
          background: `linear-gradient(135deg, ${primaryColor} 0%, #0d3530 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        1. Record your measurements
      </Typography>

      <Typography
        sx={{
          color: "#666",
          textAlign: "center",
          mb: 5,
          maxWidth: 550,
          mx: "auto",
        }}
      >
        Please follow these simple steps when recording your video.
      </Typography>

      {/* Steps */}
      <Box sx={{ mb: 5, maxWidth: 650, mx: "auto" }}>
        {steps.map((s, i) => (
          <Box
            key={s.title}
            sx={{
              display: "flex",
              position: "relative",
              mb: i < steps.length - 1 ? 4 : 0,
            }}
          >
            {/* connecting line */}
            {i < steps.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 56,
                  left: 24,
                  width: 2,
                  height: 60,
                  background: `${primaryColor}66`,
                }}
              />
            )}

            <Box sx={{ mr: 3 }}>
              <CustomStepIcon number={i + 1} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {s.title}
              </Typography>
              <Typography sx={{ color: "#666" }}>{s.desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* sample video */}
      <Typography
        sx={{
          color: primaryColor,
          fontWeight: 700,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 1,
          mb: 2,
        }}
      >
        Sample video
      </Typography>
      <InteractiveVideoCard />

      {/* record button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #0d3530 100%)`,
          color: "#fff",
          fontWeight: 700,
          py: 2.5,
          borderRadius: 4,
          mb: 4,
          "&:hover": {
            background: `linear-gradient(135deg, #0d3530 0%, ${primaryColor} 100%)`,
          },
        }}
        onClick={() => onSubmit("measurement")}
      >
        Record video
      </Button>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <LockIcon
          sx={{ color: primaryColor, mr: 1, verticalAlign: "middle" }}
        />
        <Typography
          component="span"
          sx={{ color: primaryColor, fontWeight: 600 }}
        >
          Confidential & Secure
        </Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab 2 – Full-body                                                 */
/* ------------------------------------------------------------------ */
export function FullBodyTab({ onSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const steps = [
    {
      title: "Position your phone",
      desc: "Place your phone on the edge of a table at a stable position.",
    },
    {
      title: "Step back into frame",
      desc: "Ensure your entire body is visible in the video. Stand straight with good lighting.",
    },
    {
      title: "Turn for full view",
      desc: "Slowly rotate 360° to show different angles of your body.",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 2,
          textAlign: "center",
          background: `linear-gradient(135deg, ${primaryColor} 0%, #0d3530 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        2. Record your full-body
      </Typography>

      <Typography sx={{ color: "#666", textAlign: "center", mb: 4 }}>
        Now we need to confirm your full-body view. Follow these steps:
      </Typography>

      {/* illustration box */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/liveRecord.png"
          alt=""
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            maxWidth: "600px",
            maxHeight: "600px",
          }}
        />
      </Box>

      {/* Steps */}
      <Box sx={{ mb: 5, maxWidth: 650, mx: "auto" }}>
        {steps.map((s, i) => (
          <Box
            key={s.title}
            sx={{
              display: "flex",
              position: "relative",
              mb: i < steps.length - 1 ? 4 : 0,
            }}
          >
            {i < steps.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 56,
                  left: 24,
                  width: 2,
                  height: 60,
                  background: `${primaryColor}66`,
                }}
              />
            )}
            <Box sx={{ mr: 3 }}>
              <CustomStepIcon number={i + 1} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {s.title}
              </Typography>
              <Typography sx={{ color: "#666" }}>{s.desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Alert
        icon={<LightbulbIcon />}
        severity="info"
        sx={{
          mb: 4,
          background: `${primaryColor}0D`,
          color: primaryColor,
          border: `1px solid ${primaryColor}33`,
        }}
      >
        <strong>Tip:</strong> Wear fitted, light-coloured clothing and make sure
        the area is well-lit.
      </Alert>

      <Typography
        sx={{
          color: primaryColor,
          fontWeight: 700,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 1,
          mb: 2,
        }}
      >
        Sample video
      </Typography>
      <InteractiveVideoCard />

      <Button
        fullWidth
        variant="contained"
        sx={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #0d3530 100%)`,
          color: "#fff",
          fontWeight: 700,
          py: 2.5,
          borderRadius: 4,
          mb: 4,
          "&:hover": {
            background: `linear-gradient(135deg, #0d3530 0%, ${primaryColor} 100%)`,
          },
        }}
        onClick={() => onSubmit("measurement")}
      >
        Record video
      </Button>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <LockIcon
          sx={{ color: primaryColor, mr: 1, verticalAlign: "middle" }}
        />
        <Typography
          component="span"
          sx={{ color: primaryColor, fontWeight: 600 }}
        >
          Confidential & Secure
        </Typography>
      </Box>
    </Box>
  );
}
