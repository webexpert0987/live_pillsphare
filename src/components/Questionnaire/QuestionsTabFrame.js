import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper, Container } from "@mui/material";
import YourDetail from "../Questionnaire/YourDetails"; // Import the component
import MultiStepQuestion from "../Questionnaire/MultiStepQuestion"; // Import the component
import YourTreatment from "../Questionnaire/YourTreatment"; // Import the component

const tabData = [
  {
    number: "1",
    title: "Your Details",
    content: "Please complete your account details for consultation.",
  },
  {
    number: "2",
    title: "Consultation",
    content: "A consultation provides a personalized approach to weight loss.",
  },
  {
    number: "3",
    title: "Your Treatment",
    content: "Customized Plans to Achieve Your Weight Loss Goals.",
  },
  {
    number: "4",
    title: "Checkout",
    content: "Securely Complete Your Purchase and Start Your Journey.",
  },
];

const styles = {
  wrapper: {
    padding: "70px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  leftSidebar: {
    backgroundColor: "#F6EFDF",
    width: "28%",
    borderRadius: "10px",
    padding: "0",
    boxShadow: "none",
    position: "relative",
    minHeight: "700px",
  },
  leftSidebarWrapp: {
    position: "relative",
    overflow: "hidden",
  },
  rightWrapper: {
    width: "68%",
    border: "30px solid #F7F7F7",
    borderRadius: "10px",
    padding: "30px 45px",
  },
  progressLine: {
    position: "absolute",
    left: "52px",
    top: "0",
    width: "4px",
    height: "100%",
    backgroundColor: "#ddd",
  },
  progressActive: (progressHeight) => ({
    position: "absolute",
    left: "52px",
    top: "0",
    width: "4px",
    height: progressHeight,
    backgroundColor: "#104239",
    transition: "height 0.3s ease-in-out",
  }),
  tabBoxDiv: {
    padding: "0",
    maxWidth: "100%",
  },
  tabBox: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "15px",
    width: "100%",
    padding: "15px 20px",
    backgroundColor: isActive ? "#EFE5CE" : "transparent",
    borderRadius: "0",
    transition: "0.3s ease-in-out",
    cursor: "pointer",
    margin: "40px 0 0 0",
  }),
  tabNumber: (isActive) => ({
    fontWeight: "800",
    color: "#FFF",
    backgroundColor: isActive ? "#104239" : "#9B8962",
    fontSize: "48px",
    minWidth: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.3s",
  }),
  tabTitle: (isActive) => ({
    fontWeight: "700",
    color: isActive ? "#104239" : "#9B8962",
    transition: "color 0.3s",
    textTransform: "capitalize",
  }),
  tabsubtitle: (isActive) => ({
    fontSize: "15px",
    fontWeight: "500",
    color: isActive ? "#104239" : "#9B8962",
    transition: "color 0.3s",
    textTransform: "capitalize",
  }),
};

function VerticalTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const progressHeight = `${(selectedTab / (tabData.length - 1)) * 100}%`;

  return (
    <Container>
      <Box style={styles.wrapper}>
        <Paper style={styles.leftSidebar}>
          <Box style={styles.leftSidebarWrapp}>
            <Box style={styles.progressLine}></Box>
            <Box style={styles.progressActive(progressHeight)}></Box>
            <Tabs
              orientation="vertical"
              value={selectedTab}
              onChange={(event, newValue) => setSelectedTab(newValue)}
              sx={{ height: "100%" }}
            >
              {tabData.map((tab, index) => {
                const isActive = selectedTab === index;
                return (
                  <Tab
                    style={styles.tabBoxDiv}
                    key={index}
                    label={
                      <Box style={styles.tabBox(isActive)}>
                        <Typography style={styles.tabNumber(isActive)}>
                          {tab.number}
                        </Typography>
                        <Box>
                          <Typography
                            variant="h6"
                            style={styles.tabTitle(isActive)}
                          >
                            {tab.title}
                          </Typography>
                          <Typography
                            style={styles.tabsubtitle(isActive)}
                            variant="body2"
                          >
                            {tab.content}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      textAlign: "left",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      transition: "0.3s",
                    }}
                  />
                );
              })}
            </Tabs>
          </Box>
        </Paper>

        <Box style={styles.rightWrapper}>
          {/* Add QuestionHero component only for the "Your Details" tab */}
          {selectedTab === 0 && <YourDetail />}
          {selectedTab === 1 && <MultiStepQuestion />}
          {selectedTab === 2 && <YourTreatment />}
        </Box>
      </Box>
    </Container>
  );
}

export default VerticalTabs;
