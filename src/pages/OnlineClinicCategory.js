import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import HowItWorks from "../components/WeightLoss/HowItWorks";
//import ProductGridSlider from "../components/WeightLoss/productGridSlider";
import Treatments from "../components/WeightLoss/Treatments";
import ExplainHowItWorks from "../components/WeightLoss/ExplainHowItWorks";
import AverageWeightLoss from "../components/WeightLoss/AverageWeightLoss";
//import RelatedArticleSlider from "../components/WeightLoss/RelatedArticleSlider";
import { useParams } from "react-router-dom";

const onlineClinicItems = [
  { 
    id: 1, 
    name: "Weight Loss", 
    link: "weight-loss", 
    points: [
      "Lose up to 20% of body weight", 
      "Support from UK clinicians", 
      "Online prescriptions with discreet delivery"
    ]
  },
  { 
    id: 2, 
    name: "Acid Reflux", 
    link: "acid-reflux", 
    points: [
      "Effective relief from heartburn & indigestion", 
      "Expert guidance from UK clinicians", 
      "Convenient online prescriptions with discreet delivery"
    ]
  },
  { 
    id: 3, 
    name: "Contraceptives", 
    link: "contraceptives",
    points: [
      "Safe and effective birth control options",
      "Prescribed by licensed UK clinicians",
      "Discreet and convenient online ordering"
    ]
  },
  { 
    id: 4, 
    name: "Cystitis", 
    link: "cystitis",
    points: [
      "Fast relief from urinary tract infections",
      "Expert consultation available online",
      "Medications delivered discreetly"
    ]
  },
  { 
    id: 5, 
    name: "Erectile Dysfunction", 
    link: "erectile-dysfunction", 
    points: [
      "Clinically proven ED treatments",
      "Discreet online consultation",
      "Fast and confidential delivery"
    ]
  },
  { 
    id: 6, 
    name: "Hair Loss", 
    link: "hair-loss",
    points: [
      "Effective treatments for hair thinning",
      "Guidance from licensed clinicians",
      "Delivered straight to your door"
    ]
  },
  { 
    id: 7, 
    name: "High Fever", 
    link: "high-fever",
    points: [
      "Fast-acting relief for fever symptoms",
      "Expert medical advice available online",
      "Prescription medication delivered quickly"
    ]
  },
  { 
    id: 8, 
    name: "Migraine Treatment Eligibility Questionnaire", 
    link: "migraine",
    points: [
      "Personalized migraine treatment plans",
      "Consult with UK clinicians online",
      "Fast access to effective medications"
    ]
  },
  { 
    id: 9, 
    name: "Period Delay", 
    link: "period-delay",
    points: [
      "Delay your period safely and effectively",
      "Doctor-approved treatments",
      "Easy online consultation and delivery"
    ]
  },
  { 
    id: 10, 
    name: "Period Pain", 
    link: "period-pain",
    points: [
      "Effective relief for menstrual cramps",
      "Personalized treatment options",
      "Convenient online prescriptions"
    ]
  },
  { 
    id: 11, 
    name: "Premature Ejaculation Assessment", 
    link: "premature-ejaculation",
    points: [
      "Clinically proven PE treatments",
      "Online consultation with UK experts",
      "Discreet and fast medication delivery"
    ]
  },
  { 
    id: 12, 
    name: "Stop Smoking", 
    link: "smoking",
    points: [
      "Proven methods to quit smoking",
      "Support from experienced clinicians",
      "Prescriptions delivered to your door"
    ]
  },
];


function OnlineClinicCategory() {
  const { slug } = useParams();
  const item = onlineClinicItems.find((item) => item.link === slug);
  const title = item?.name;
  const pointList = item?.points;
  return (
    <div>
      <Box>
        <HeroSection weightLossHero={title} points={pointList}/>
        <TrustBar />
        <HowItWorks route={item.link} />
        {/**<ProductGridSlider /> **/}
        <Treatments />
        <ExplainHowItWorks />
        <AverageWeightLoss />
        {/** <RelatedArticleSlider /> **/}
      </Box>
    </div>
  );
}

export default OnlineClinicCategory;
