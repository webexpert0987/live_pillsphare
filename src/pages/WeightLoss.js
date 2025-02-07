import React from 'react'
import { Box } from "@mui/material";
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import HowItWorks from "../components/WeightLoss/HowItWorks";
import ProductGridSlider from "../components/WeightLoss/productGridSlider";
import Treatments from "../components/WeightLoss/Treatments"
import ExplainHowItWorks from "../components/WeightLoss/ExplainHowItWorks";
import AverageWeightLoss from "../components/WeightLoss/AverageWeightLoss";
import RelatedArticleSlider from "../components/WeightLoss/RelatedArticleSlider";



function WeightLoss() {
  const weight_title = 'Weight Loss';
  return (
    <div>
      <Box>
        <HeroSection weightLossHero={weight_title} />
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
