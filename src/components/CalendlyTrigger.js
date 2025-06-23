import React, { useState } from "react";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { Link } from "@mui/material";
import { uploadLiveRecord } from "../apis/apisList/orderApi";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../Context/MessageContext";

const CalendlyModalTrigger = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      uploadLiveRecord({
        order_id: orderId,
        source: "calendly",
        link: "",
      }).then(() => {
        showMessage("Meeting schedule successfully.", "success");
        navigate("/");
        window.scrollTo({ top: 0 });
      });
    },
  });

  return (
    <>
      <Link
        component="button"
        variant="body1"
        color="#c86300"
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        onClick={() => setOpen(true)}
      >
        Schedule a Zoom video call
      </Link>

      <PopupModal
        url={`https://calendly.com/shikar-kerim-shamapharma/30min`}
        rootElement={document.getElementById("root")}
        open={open}
        onModalClose={() => setOpen(false)}
        utm={{
          utm_campaign: "Checkout",
          utm_source: "Website",
          utm_medium: "ZoomModal",
          orderId: orderId, // ✅ this will also get passed
        }}
        prefill={
          {
            // Optional pre-fill fields:
            // name: "",
            // email: "test@example.com",
          }
        }
      />
    </>
  );
};

export default CalendlyModalTrigger;
