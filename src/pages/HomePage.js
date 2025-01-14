import { Box } from "@mui/material";
import ServiceProvided from '../components/HomePage/serviceProvided';
import TreatmentSection from "../components/HomePage/treatmentSection";
import DiscreetPackagingSection from "../components/HomePage/discreetPackaging";
import WeeklyOffersSection from "../components/HomePage/weeklyOfferCategory";
import HowItWorksSection from "../components/HomePage/HowItWorksSection";
import FeaturedProducts from "../components/HomePage/featuredProduct/FeaturedProduct";

const HomePage = () => {
    return(
        <Box>
            <ServiceProvided/>
            <TreatmentSection/>
            <FeaturedProducts/>
            <DiscreetPackagingSection/>
            <WeeklyOffersSection/>
            <HowItWorksSection/>
        </Box>
    )
}

export default HomePage