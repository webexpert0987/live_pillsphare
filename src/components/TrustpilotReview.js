import { useEffect } from "react";

const TrustpilotWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="67f3868be3692dd8cf665811"
      data-style-height="150px"
      data-style-width="100%"
      data-theme="light"
    >
      <a
        href="https://uk.trustpilot.com/review/pillsphere.com"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustpilotWidget;
