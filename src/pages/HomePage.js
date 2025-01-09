import { Box } from "@mui/material";
import ServiceProvided from '../components/HomePage/serviceProvided';
import TreatmentSection from "../components/HomePage/treatmentSection";

const HomePage = () => {
    return(
        <Box>
            <ServiceProvided/>
            <TreatmentSection/>
        </Box>
    )
}

export default HomePage