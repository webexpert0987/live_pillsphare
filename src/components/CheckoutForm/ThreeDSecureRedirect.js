import React, { useEffect } from "react";
import { verifyPayment } from "../../apis/apisList/opayoPaymentApi";

const ThreeDSecureHandler = ({ threeDSData, onComplete }) => {
  const { jwt, url, verifyUrl } = threeDSData || {};

  const handleVerify = async () => {
    try {
      const res = await verifyPayment({ url: verifyUrl });
      const data = res.data;

      if (data?.outcome === "3dsChallenged" && data?.challenge) {
        // Redirect to challenge
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
        // Final outcome - invoke callback
        onComplete(data);
      }
    } catch (error) {
      console.error("❌ verifyPayment failed", error);
      onComplete(null);
    }
  };

  const startDeviceDataCollection = async () => {
    if (!jwt || !url) {
      console.warn("Missing JWT or URL for device data collection");
      return;
    }

    // 1. Submit DDC JWT to Cardinal iframe
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

    // 2. Wait a few seconds and call supply3dsDeviceData
    setTimeout(async () => {
      try {
        // const supplyRes = await supply3dsDeviceData(); // your wrapper for POST to `supply3dsDeviceData.href`
        // console.log("✅ supply3dsDeviceData response:", supplyRes.data);
        handleVerify();
      } catch (err) {
        console.error("❌ supply3dsDeviceData failed", err);
        onComplete(null);
      }

      document.body.removeChild(form);
    }, 4000); // Wait ~4s to ensure iframe loads and runs
  };

  useEffect(() => {
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
