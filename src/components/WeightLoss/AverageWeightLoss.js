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
  Wrapp: {
    padding: "70px 0",
    backgroundColor: "#F7F7F7",
  },
  tHead: {
    fontSize: "18px",
    color: "#FFF",
    fontWeight: "bold",
    width: "25%",
    padding: "18px 25px",
    borderBottom: `1px solid ${borderColor}`, // Bottom border only
    borderRight: `1px solid ${borderColor}`, // Right border only
  },
  tBody: {
    fontSize: "18px",
    color: "#333333",
    fontWeight: "500",
    width: "25%",
    padding: "18px 25px",
    borderBottom: `1px solid ${borderColor}`, // Bottom border only
    borderRight: `1px solid ${borderColor}`, // Right border only
  },
  lastColumn: {
    borderRight: "none", // Removes right border for last column
  },
  lastRow: {
    borderBottom: "none", // Removes bottom border for last row
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    lineHeight: "1.3",
    marginBottom: "20px",
  },
  paragraphTxt: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#4A4A4A",
    lineHeight: "1.6",
    marginBottom: "35px",
    width: "700px",
    maxWidth: "100%",
  },
  sectionNote: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#4A4A4A",
    lineHeight: "1.6",
    marginTop: "24px",
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
    <Box style={weightCompStyle.Wrapp}>
      <Container>
        <Box style={weightCompStyle.sectionInfo}>
          {/* Title */}
          <Typography style={weightCompStyle.sectionTitle} variant="h2">
            Average Weight Loss (% of Body Weight)
          </Typography>

          {/* Paragraph */}
          <Typography style={weightCompStyle.paragraphTxt} variant="body1">
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
            overflow: "hidden",
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
        <Typography style={weightCompStyle.sectionNote} variant="h6">
          Recent Developments in Weight Loss Treatments
        </Typography>
      </Container>
    </Box>
  );
};

export default WeightLossComparison;
