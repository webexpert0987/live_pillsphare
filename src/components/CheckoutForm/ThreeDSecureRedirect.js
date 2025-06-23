import React, { useEffect, useRef } from "react";
import { verifyPayment } from "../../apis/apisList/opayoPaymentApi";

const ThreeDSecureHandler = ({ threeDSData, onComplete, onError }) => {
  const { jwt, url, verifyUrl } = threeDSData || {};
  const hasVerifiedRef = useRef(false); // ❗ Track if verify already called

  const handleVerify = async () => {
    if (hasVerifiedRef.current) return; // 🔒 Prevent duplicate call
    hasVerifiedRef.current = true;

    try {
      const res = await verifyPayment({ url: verifyUrl });
      const data = res.data;

      if (data?.outcome === "3dsChallenged" && data?.challenge) {
        // 🔄 Redirect to 3DS Challenge
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.challenge.url;
        form.target = "_self";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "JWT";
        input.value = data.challenge.jwt;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      } else {
        // ✅ Final outcome
        onComplete(data);
      }
    } catch (error) {
      console.error("❌ verifyPayment failed", error);
      onError(error);
    }
  };

  const startDeviceDataCollection = async () => {
    if (!jwt || !url) {
      console.warn("Missing JWT or URL for device data collection");
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.target = "threeDSIframe";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "JWT";
    input.value = jwt;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      handleVerify();
      document.body.removeChild(form);
    }, 4000); // Allow DDC to complete before verify
  };

  useEffect(() => {
    hasVerifiedRef.current = false; // Reset on component mount
    startDeviceDataCollection();
  }, [jwt, url]);

  return (
    <iframe
      name="threeDSIframe"
      style={{ display: "none" }}
      title="3DS DDC Hidden Frame"
    />
  );
};

export default ThreeDSecureHandler;
