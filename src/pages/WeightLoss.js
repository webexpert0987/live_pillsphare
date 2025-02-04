import React from 'react'
import { Box } from "@mui/material";
import HeroSection from "../components/WeightLoss/HeroSection";
import TrustBar from "./Trustbar";
import HowItWorks from "../components/WeightLoss/HowItWorks";
import ProductGridSlider from "../components/WeightLoss/productGridSlider";
import Treatments from "../components/WeightLoss/Treatments"
import ExplainHowItWorks from "../components/WeightLoss/ExplainHowItWorks";
import AverageWeightLoss from "../components/WeightLoss/AverageWeightLoss";
import RelatedArticleSlider from "../components/WeightLoss/RelatedArticleSlider";

function WeightLoss() {
  return (
    <div>
      <Box>
        <HeroSection/>
        <TrustBar/>
        <HowItWorks/>
        <ProductGridSlider/>
        <Treatments />
        <ExplainHowItWorks/>
        <AverageWeightLoss/>
        <RelatedArticleSlider/>
      </Box>
    </div>
  )
}

export default WeightLoss
