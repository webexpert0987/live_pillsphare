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

const AddressSearch = ({
  onAddressSelect,
  styles,
  placeholder = "Search for your address",
}) => {
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // Track selected value
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);

  const searchAddresses = async (query) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    setSearching(true);

    try {
      const response = await fetch(
        `https://api.os.uk/search/places/v1/find?query=${encodeURIComponent(
          query
        )}&key=UEbcY1BePLoyHbAilQQIGdHbp29GXuBP`
      );
      const data = await response.json();

      if (data.results) {
        const addresses = data.results.map((result) => ({
          id: result.DPA.UPRN,
          label: result.DPA.ADDRESS,
          address: {
            line1: result.DPA.ADDRESS || "",
            line2: result.DPA.BUILDING_NAME || "",
            postcode: result.DPA.POSTCODE || "",
            city: result.DPA.POST_TOWN || "",
            country: (result.DPA.COUNTRY_CODE_DESCRIPTION || "")
              .split(" ")
              .pop(), // Extract only the country
          },
        }));

        setAddressSuggestions(addresses);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddressSuggestions([]);
    } finally {
      setSearching(false);
    }
  };

  const debouncedSearch = debounce((searchTerm) => {
    searchAddresses(searchTerm);
  }, 300);

  useEffect(() => {
    if (query && query !== selectedValue) {
      debouncedSearch(query);
    } else {
      setAddressSuggestions([]);
    }
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <Box sx={{ padding: 2, margin: "auto", width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={selectedValue || query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedValue(""); // Clear selected value when typing
        }}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setQuery("");
                  setSelectedValue("");
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={styles}
      />
      {searching ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        query &&
        !selectedValue && (
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
            {addressSuggestions.length > 0
              ? addressSuggestions.map((option) => (
                  <ListItem
                    key={option.id}
                    sx={{
                      borderBottom: "1px solid #eee",
                      "&:last-child": { borderBottom: "none" },
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                    onClick={() => {
                      if (onAddressSelect) {
                        onAddressSelect(option.address);
                      }
                      setSelectedValue(option.label); // Set selected value
                      setAddressSuggestions([]); // Clear suggestions to hide the list
                    }}
                  >
                    <ListItemText primary={option.label} />
                  </ListItem>
                ))
              : !selectedValue && ( // Prevent "No results found" if a value is selected
                  <ListItem>
                    <ListItemText primary="No results found" />
                  </ListItem>
                )}
          </List>
        )
      )}
    </Box>
  );
};

export default AddressSearch;
