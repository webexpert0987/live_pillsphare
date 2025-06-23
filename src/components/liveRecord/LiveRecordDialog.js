import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const LiveRecordDialog = ({ open, onClose, onSubmit, tab }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    if (open) {
      startCamera(facingMode);
    } else {
      stopCamera();
      resetAll();
    }
    return () => stopCamera();
  }, [open, facingMode]);

  const startCamera = async (mode = "user") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      streamRef.current = stream;
      setCameraError(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access error:", error);
      setCameraError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const resetAll = () => {
    setRecordedBlob(null);
    setIsRecording(false);
    setIsPreview(false);
    setCameraError(null);
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const chunks = [];
    const recorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setRecordedBlob(blob);
      setIsPreview(true);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    stopCamera();
  };

  const handleRetake = () => {
    setIsPreview(false);
    setRecordedBlob(null);
    startCamera(facingMode);
  };

  const handleSubmit = () => {
    if (recordedBlob && onSubmit) onSubmit(recordedBlob);
    onClose();
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogContent
        sx={{
          p: 0,
          bgcolor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mt: 2, mb: 1, color: "white", textAlign: "center" }}
        >
          {isPreview ? "Preview Video" : "Record Live Video"}
        </Typography>

        {cameraError ? (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {cameraError}
          </Alert>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {isPreview && recordedBlob ? (
              <video
                key={URL.createObjectURL(recordedBlob)}
                src={URL.createObjectURL(recordedBlob)}
                controls
                autoPlay
                muted
                style={{ width: "100%", height: "90%", objectFit: "cover" }}
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
        )}

        {/* Control Buttons */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            bgcolor: "#212121cc",
            py: 1,
            px: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            zIndex: 100,
          }}
        >
          {!isPreview ? (
            <>
              {!isRecording ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startRecording}
                  disabled={!!cameraError}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={stopRecording}
                >
                  Finish Recording
                </Button>
              )}
              <Button variant="contained" color="inherit" onClick={onClose}>
                Cancel
              </Button>
              {/* Flip Camera only on small devices */}
              {window.innerWidth < 768 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={toggleFacingMode}
                >
                  Flip Camera
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleRetake}>
                Retake
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LiveRecordDialog;
