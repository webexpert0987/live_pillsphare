import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, List, ListItem, ListItemText, styled, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import theme from "../../Theme/theme";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';

// const ImgText = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center'
// }));

const ImgText = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "20px 0px 20px 10px",
  });
  
  const StyledTab = styled(Tab)(({ theme }) => ({
    '.MuiTab-root': { fontSize: '18px'}, display: 'flex !important', flexDirection: 'row !important', gap: '10px', color: "white", "&.Mui-selected": {
        color: "#F5E7D1",
        fontWeight: "bold",
    }

}));

const ProductOverview = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState("Buy Vitabiotics Wellman Energy");

  const handleTabChange = (event, newIndex) => {
   
    setTabIndex(newIndex);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Tabs Section */}
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{
              backgroundColor: "primary.main", borderRadius: 2,   "& .MuiTabs-indicator": {
                backgroundColor: "#fff",
                height: "2px",
              },
              "& .MuiTabs-scroller": {
                overflow: {xs: 'scroll !important', md: 'hidden !important'},
                marginLeft: '50px'
            }
          }}>
              {/* <ImgText sx={{marginLeft: '40px'}}>
                  <Icon icon="material-symbols:description-outline-rounded" width="30" height="30" color="#fff" />
              </ImgText> */}
              <StyledTab icon={<Icon icon="material-symbols:description-outline-rounded" width="30" height="30" />} label="Description" sx={{marginRight: '20px'}} fontSize={theme.typography.h3.fontSize}
              />
              {/* <ImgText>
                  <img src="/images/medicineSVG.svg" width={'30px'} height={'30px'}></img>
              </ImgText> */}
              <StyledTab icon={<img src="/images/medicineSVG.svg" width={'30px'} height={'30px'}></img>} label="Information" sx={{marginRight: '20px'}} fontSize={theme.typography.h3.fontSize} />
              {/* <ImgText>
                  <EditNoteSharpIcon style={{ color: '#fff' }} fontSize="large" />
              </ImgText> */}
              <StyledTab icon={<EditNoteSharpIcon style={{ color: '#fff' }} fontSize="large" />} label="Questions" sx={{marginRight: '20px'}} fontSize={theme.typography.h3.fontSize} />
              {/* <ImgText>
                  <Icon icon="solar:box-linear" width="30" height="30" color="#fff" />
              </ImgText> */}
              <StyledTab icon={<Icon icon="solar:box-linear" width="30" height="30" color="#fff" />} label="Delivery" sx={{marginRight: '20px'}} fontSize={theme.typography.h3.fontSize}/>
      </Tabs>

      {/* Main Content */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mt: 3 }}>
        {/* Sidebar Navigation */}
        <Box
          sx={{
            width: { xs: "100%", md: "310px" },
            bgcolor: "#F7F7F7",
            p: 2,
            borderRadius: 2,
            mr: { md: 3 },
            mb: { xs: 3, md: 0 },
          }}
        >
          <List>
            {["Buy Vitabiotics Wellman Energy", "Directions", "Side Effects", "Warnings"].map((section, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSectionClick(section)}
                sx={{
                  bgcolor: "transparent",
                  color: selectedSection === section ? theme.palette.tertiary.main : "#000",
                  borderRadius: 0,
                  mb: 1,
                  borderBottom: '1px solid #000'
                }}
              >
                <Box display={'flex'} alignItems={'center'} gap={1}>
                    {<Icon icon="material-symbols:square-rounded" width="16" height="16"  style={{color: selectedSection === section? theme.palette.tertiary.main: theme.palette.primary.main}} />}
                    <ListItemText primary={section} sx={{'.MuiTypography-body1': {fontSize:theme.typography.h4.fontSize}}}/>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Content Area */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body5" component={'h1'} sx={{ color: "#FF6600", mb: '10px', fontWeight: 700, }}>
            {selectedSection}
          </Typography>
          <Typography variant="h4">
            {selectedSection === "Buy Vitabiotics Wellman Energy" && (
              <>
                Need an extra boost of energy? Vitabiotics Wellman Energy are effervescent tablets for men that dissolve
                into a tasty orange-flavoured drink. Whether you’re dealing with a hectic life, late nights or travel,
                these tablets provide a welcome nutritional boost with vitamin C, B1, B6, biotin, iron, magnesium, and
                selenium.
              </>
            )}
            {selectedSection === "Directions" && (
              <>
                Dissolve one Vitabiotics Wellman Energy tablet in a glass of water. Take once daily, as required. Do not
                exceed the recommended intake.
              </>
            )}
            {selectedSection === "Side Effects" && (
              <>
                Vitabiotics Wellman Energy has no known side effects if the recommended intake is not exceeded. If you
                take too many, seek medical attention immediately.
              </>
            )}
            {selectedSection === "Warnings" && (
              <>
                Do not take these supplements if you are allergic to any of the ingredients. Speak to your doctor or
                pharmacist before taking Vitabiotics Wellman Energy if you are taking any other medicines.
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductOverview;
