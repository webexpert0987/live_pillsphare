import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import HowItWorks from "../components/WeightLoss/HowItWorks";
//import ProductGridSlider from "../components/WeightLoss/productGridSlider";
import Treatments from "../components/WeightLoss/Treatments";
import ExplainHowItWorks from "../components/WeightLoss/ExplainHowItWorks";
import AverageWeightLoss from "../components/WeightLoss/AverageWeightLoss";
import HealthSolution from "../components/WeightLoss/HealthSolution";
//import RelatedArticleSlider from "../components/WeightLoss/RelatedArticleSlider";

function WeightLoss() {
  const weight_title = "Weight Loss";
  return (
    <Box>
      <Box>
        <HeroSection
          weightLossHero={weight_title}
          description="Expert-Backed Medical Weight Loss Plans in the UK | Trusted Online Pharmacy & Private Clinic
Explore professional obesity treatments and advice from leading specialists. Find tailored weight loss solutions at our UK-based online pharmacy and private clinic."
        />
        <TrustBar />
        <HowItWorks route="weight-loss" />
        {/**<ProductGridSlider />**/}
        <Treatments />
        <HealthSolution />
        <ExplainHowItWorks />
        <AverageWeightLoss />
        {/** <RelatedArticleSlider /> **/}
      </Box>
    </Box>
  );
}

export default WeightLoss;
