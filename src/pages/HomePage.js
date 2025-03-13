import { Box } from "@mui/material";
import ServiceProvided from "../components/HomePage/serviceProvided";
import TreatmentSection from "../components/HomePage/treatmentSection";
import DiscreetPackagingSection from "../components/HomePage/discreetPackaging";
import WeeklyOffersSection from "../components/HomePage/weeklyOfferCategory";
import HowItWorksSection from "../components/HomePage/HowItWorksSection";
import FeaturedProducts from "../components/HomePage/featuredProduct/FeaturedProduct";
import Carousel from "../components/HomePage/homeCarousel/carousel";
import ConditionsWeTreat from "../components/OnlineClinic/ConditionsWeTreat";

const HomePage = () => {
  return (
    <Box>
      <Carousel />
      <ServiceProvided />
      <ConditionsWeTreat />
      {/* <TreatmentSection/> */}
      <FeaturedProducts />
      <DiscreetPackagingSection />
      <HowItWorksSection />
      <WeeklyOffersSection />
    </Box>
  );
};

export default HomePage;
