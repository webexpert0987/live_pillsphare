import React from "react";
import OnlineClinicHero from "./OnlineClinicHero";
import HowItWork from "./HowItWorks";
import ConditionWeTreat from "./ConditionsWeTreat";
import AboutWork from "./AboutWork";

function OnlineClinicPage() {
  return (
    <div>
      <OnlineClinicHero />
      <ConditionWeTreat />
      <HowItWork />
      <AboutWork />
    </div>
  );
}

export default OnlineClinicPage;
