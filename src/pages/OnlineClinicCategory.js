import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import HowItWorks from "../components/WeightLoss/HowItWorks";
import ProductGridSlider from "../components/WeightLoss/productGridSlider";
import Treatments from "../components/WeightLoss/Treatments";
import ExplainHowItWorks from "../components/WeightLoss/ExplainHowItWorks";
import AverageWeightLoss from "../components/WeightLoss/AverageWeightLoss";
import RelatedArticleSlider from "../components/WeightLoss/RelatedArticleSlider";
import { useParams } from "react-router-dom";

const onlineClinicItems = [
  { id: 1, name: "Weight Loss", link: "weight-loss" },
  { id: 2, name: "Acid Reflux", link: "acid-reflux" },
  {
    id: 3,
    name: "Contraceptives",
    link: "contraceptives",
  },
  { id: 4, name: "Cystitis", link: "cystitis" },
  {
    id: 5,
    name: "Erectile Dysfunction",
    link: "erectile-dysfunction",
  },
  { id: 6, name: "Hair Loss", link: "hair-loss" },
  { id: 7, name: "High Fever", link: "high-fever" },
  {
    id: 8,
    name: "Migraine Treatment Eligibility Questionnaire",
    link: "migraine",
  },
  { id: 9, name: "Period Delay", link: "period-delay" },
  { id: 10, name: "Period Pain", link: "period-pain" },
  {
    id: 11,
    name: "Premature Ejaculation Assessment",
    link: "premature-ejaculation",
  },
  { id: 12, name: "Stop Smoking", link: "smoking" },
];

function OnlineClinicCategory() {
  const { slug } = useParams();
  const item = onlineClinicItems.find((item) => item.link === slug);
  const title = item?.name;
  return (
    <div>
      <Box>
        <HeroSection weightLossHero={title} />
        <TrustBar />
        <HowItWorks route={item.link} />
        <ProductGridSlider />
        <Treatments />
        <ExplainHowItWorks />
        <AverageWeightLoss />
        <RelatedArticleSlider />
      </Box>
    </div>
  );
}

export default OnlineClinicCategory;
