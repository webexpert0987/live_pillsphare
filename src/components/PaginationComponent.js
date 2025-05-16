import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";

const PaginationComponent = ({ page, onChange, count = 10,setPage = () => {} }) => {
  // console.log('page no',page);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        marginBottom: "20px",
        width: "100%",
        padding: "10px",
        backgroundColor: "#F2F2F2",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
        whiteSpace: "nowrap",
        flexWrap: "nowrap",
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "@media (max-width: 600px)": {
          justifyContent: "center",
        },
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari
        },
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          "& .MuiPagination-ul": {
            display: "flex",
            flexWrap: "nowrap",
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              minWidth: "36px",
              height: "36px",
              fontSize: "14px",
              "&.Mui-selected": {
                backgroundColor: "#FD6400",
                color: "#FFF",
                fontWeight: "bold",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default PaginationComponent;
