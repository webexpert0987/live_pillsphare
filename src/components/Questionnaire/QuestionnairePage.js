import React from "react";
import { Box } from "@mui/material"; 
import QuestionHero from "../Questionnaire/QuestionHero";
import HowItWorksSection from "../HomePage/HowItWorksSection";
import RelatedArticleSlider from "../WeightLoss/RelatedArticleSlider";
import QuestionsTabFrame from "../Questionnaire/QuestionsTabFrame";

function QuestionnaireMain() {  // Corrected the typo in the component name
  return (
    <>
    <Box>
      <QuestionHero />
      <QuestionsTabFrame/>
      <HowItWorksSection />
      <RelatedArticleSlider />
    </Box>
    </>
  );
}

export default QuestionnaireMain;
