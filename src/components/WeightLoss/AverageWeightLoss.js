import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Container,
} from "@mui/material";

const borderColor = "#EAD4A2";

const weightCompStyle = {
  tHead: {
    fontSize: "18px",
    color: "#FFF",
    fontWeight: "bold",
    width: "25%",
    padding: "18px 25px",
    lineHeight: "1.4",
    borderBottom: `1px solid ${borderColor}`, // Bottom border only
    borderRight: `1px solid ${borderColor}`, // Right border only
    "@media (max-width: 991px)": {
      fontSize: "16px",
      padding: "12px 15px",
    },
    "@media (max-width: 767px)": {
      fontSize: "15px",
      padding: "10px 12px",
    },
  },
  tBody: {
    fontSize: "18px",
    color: "#333333",
    fontWeight: "500",
    width: "25%",
    padding: "18px 25px",
    lineHeight: "1.4",
    borderBottom: `1px solid ${borderColor}`, // Bottom border only
    borderRight: `1px solid ${borderColor}`, // Right border only
    "@media (max-width: 991px)": {
      fontSize: "16px",
      padding: "12px 15px",
    },
    "@media (max-width: 767px)": {
      fontSize: "15px",
      padding: "10px 12px",
    },
  },
  lastColumn: {
    borderRight: "none", // Removes right border for last column
  },
  lastRow: {
    borderBottom: "none", // Removes bottom border for last row
  },
};

const WeightLossComparison = () => {
  const rows = [
    {
      type: "Diet & Exercise",
      loss: "4–10%",
      duration: "6–12 months",
      source: {
        name: "NEJM",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0804748",
      },
    },
    {
      type: "Orlistat",
      loss: "~9%",
      duration: "12 months",
      source: {
        name: "Diabetes, Metabolic Syndrome and Obesity",
        url: "https://dmsjournal.biomedcentral.com/articles/10.1186/s13098-023-01233-4",
      },
    },
    {
      type: "Semaglutide (Wegovy)",
      loss: "~15%",
      duration: "72 weeks",
      source: {
        name: "Diabetes, Obesity and Metabolism",
        url: "https://dom-pubs.onlinelibrary.wiley.com/doi/10.1111/dom.15386",
      },
    },
    {
      type: "Tirzepatide (Mounjaro)",
      loss: "15–21%",
      duration: "72 weeks",
      source: {
        name: "Nature Reviews Endocrinology",
        url: "https://www.nature.com/articles/s41366-024-01529-z",
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "30px 0", sm: "50px 0", md: "70px 0" },
        backgroundColor: "#F7F7F7",
      }}
    >
      <Container>
        <Box style={weightCompStyle.sectionInfo}>
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "22px", sm: "26px", md: "32px" },
              fontWeight: "700",
              color: "#333",
              lineHeight: "1.3",
              marginBottom: "20px",
            }}
          >
            Average Weight Loss (% of Body Weight)
          </Typography>

          {/* Paragraph */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              fontWeight: "500",
              color: "#4A4A4A",
              lineHeight: "1.6",
              marginBottom: "35px",
              width: "700px",
              maxWidth: "100%",
            }}
          >
            Here's the updated weight loss comparison chart, incorporating data
            from peer-reviewed medical literature and authoritative UK health
            sources:
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "15px",
            boxShadow: "none",
            border: "none",
          }}
        >
          <Table sx={{ border: "none" }}>
            {/* Table Head */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#104239" }}>
                <TableCell sx={{ ...weightCompStyle.tHead }}>
                  Treatment Type
                </TableCell>
                <TableCell sx={{ ...weightCompStyle.tHead }}>
                  Average Weight Loss (%)
                </TableCell>
                <TableCell sx={{ ...weightCompStyle.tHead }}>
                  Study Duration
                </TableCell>
                <TableCell
                  sx={{
                    ...weightCompStyle.tHead,
                    ...weightCompStyle.lastColumn,
                  }}
                >
                  Source
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tBody,
                      ...(index === rows.length - 1 && weightCompStyle.lastRow),
                    }}
                  >
                    {row.type}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tBody,
                      ...(index === rows.length - 1 && weightCompStyle.lastRow),
                    }}
                  >
                    {row.loss}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tBody,
                      ...(index === rows.length - 1 && weightCompStyle.lastRow),
                    }}
                  >
                    {row.duration}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tBody,
                      ...weightCompStyle.lastColumn,
                      ...(index === rows.length - 1 && weightCompStyle.lastRow),
                    }}
                  >
                    <Link
                      sx={{
                        color: "#FD6400",
                        textDecoration: "underline",
                        fontWeight: "700",
                      }}
                      href={row.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.source.name}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            fontWeight: "600",
            color: "#4A4A4A",
            lineHeight: "1.6",
            marginTop: "24px",
          }}
        >
          Recent Developments in Weight Loss Treatments
        </Typography>
      </Container>
    </Box>
  );
};

export default WeightLossComparison;
