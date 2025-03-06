import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
export default function eyeButton({ show, setShow }) {
  //   const [show, setShow] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        right: "10px",
        top: "10px",
        cursor: "pointer",
      }}
    >
      <IconButton onClick={() => setShow(!show)}>
        {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </div>
  );
}
