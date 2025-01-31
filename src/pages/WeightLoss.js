import React from 'react'
import { Box } from "@mui/material";
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import HowItWorks from "../components/WeightLoss/HowItWorks";
import ProductGridSlider from "../components/WeightLoss/productGridSlider";
import Treatments from "../components/WeightLoss/Treatments"
import HowItWorksSection from "../components/HomePage/HowItWorksSection"
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
        <HowItWorksSection/>
        <AverageWeightLoss/>
        <RelatedArticleSlider/>
      </Box>
    </div>
  )
}

export default WeightLoss
