import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { debounce } from "lodash";
import axios from "axios";

const GpSearch = ({ handleSubmit }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const getGpData = async (search) => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.nhs.uk/service-search", {
        headers: {
          "subscription-key": "745d49ac30854f8c91e51d4f07c171db",
        },
        params: {
          search,
          "api-version": 1,
        },
      });
      setResults(response.data.value);
    } catch (error) {
      console.error("Error fetching GP data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm) {
      getGpData(searchTerm);
    } else {
      setResults([]);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <Box sx={{ padding: 2, margin: "auto", width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={query || selectedValue}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for GP"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={() => setQuery("")}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2 }}
      />
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        query && (
          <List
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              maxHeight: 500,
              overflow: "auto",
              padding: 2,
            }}
          >
            {results.length > 0 ? (
              results.map((result) => (
                <ListItem
                  key={result.OrganisationID}
                  sx={{
                    borderBottom: "1px solid #eee",
                    "&:last-child": { borderBottom: "none" },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => {
                    handleSubmit(result);
                    setSelectedValue(result.OrganisationName);
                    setResults([]);
                    setQuery("");
                  }}
                >
                  <ListItemText
                    primary={result.OrganisationName}
                    secondary={`${result.Address1}, ${result.City}, ${result.Postcode}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => {
                  const newGp = {
                    OrganisationID: `custom-${Date.now()}`,
                    OrganisationName: query,
                    Address1: "Custom Entry",
                    City: "Unknown",
                    Postcode: "N/A",
                    type: "custom",
                  };
                  handleSubmit(newGp);
                  setSelectedValue(query);
                  setQuery("");
                }}
              >
                <ListItemText primary={`➕ Add "${query}" as a GP`} />
              </ListItem>
            )}
          </List>
        )
      )}
    </Box>
  );
};

export default GpSearch;
