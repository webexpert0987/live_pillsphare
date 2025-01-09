import { Box } from "@mui/material";
import ServiceProvided from '../components/HomePage/serviceProvided';
import TreatmentSection from "../components/HomePage/treatmentSection";
import DiscreetPackagingSection from "../components/HomePage/discreetPackaging";
import WeeklyOffersSection from "../components/HomePage/weeklyOfferCategory";
import HowItWorksSection from "../components/HomePage/HowItWorksSection";

const HomePage = () => {
    return(
        <Box>
            <ServiceProvided/>
            <TreatmentSection/>
            {/* <DiscreetPackagingSection/> */}
            <WeeklyOffersSection/>
            <HowItWorksSection/>
        </Box>
    )
}

export default HomePage