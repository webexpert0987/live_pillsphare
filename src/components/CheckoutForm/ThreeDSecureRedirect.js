import React, { useEffect } from "react";

const ThreeDSecureRedirect = ({ threeDSData }) => {
  const { acsUrl, cReq } = threeDSData || {};

  useEffect(() => {
    // Only proceed if acsUrl and cReq are available
    if (!acsUrl || !cReq) {
      console.warn("Missing acsUrl or cReq for 3D Secure redirect.");
      return;
    }

    // Create a dynamic form
    const form = document.createElement("form");
    form.method = "POST";
    form.action = acsUrl;

    // Create and append the hidden input for 'creq'
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "creq";
    input.value = cReq;

    form.appendChild(input);

    // Append the form to the document body and submit it
    // This will cause a full page redirect
    document.body.appendChild(form);
    form.submit();

    // Clean up the form after submission (it's no longer needed)
    document.body.removeChild(form);
  }, [acsUrl, cReq]); // Re-run effect if acsUrl or cReq changes

  // This component doesn't render anything as it causes a redirect
  return null;
};

export default ThreeDSecureRedirect;
