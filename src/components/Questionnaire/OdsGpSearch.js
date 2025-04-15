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

const API_URL =
  process.env.REACT_APP_GP_SEARCH_API ||
  "https://sandbox.api.service.nhs.uk/organisation-data-terminology-api/fhir/Organization";

const getPrescribingSettingLabel = (code) => {
  const settings = {
    0: "Other",
    1: "WIC Practice",
    2: "OOH Practice",
    3: "WIC + OOH Practice",
    4: "GP Practice",
    8: "Public Health Service",
    9: "Community Health Service",
    10: "Hospital Service",
    11: "Optometry Service",
    12: "Urgent & Emergency Care",
    13: "Hospice",
    14: "Care Home / Nursing Home",
    15: "Border Force",
    16: "Young Offender Institution",
    17: "Secure Training Centre",
    18: "Secure Children's Home",
    19: "Immigration Removal Centre",
    20: "Court",
    21: "Police Custody",
    22: "Sexual Assault Referral Centre (SARC)",
    24: "Other – Justice Estate",
    25: "Prison",
    26: "PCN",
    27: "Independent Pharmacy Prescriber Pathfinder",
  };
  return settings[code] || "Unknown";
};

const getStatusLabel = (code) => {
  const statuses = {
    A: "Active",
    C: "Closed",
    D: "Dormant",
    P: "Proposed",
  };
  return statuses[code] || "Unknown";
};

const GpSearch = ({ handleSubmit }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const getGpData = async (search) => {
    const token = "";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (process.env.REACT_APP_IS_PROD == "1") {
      headers.Authorization = `Bearer ${token}`;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?name=${search}`, {
        headers: headers,
      });

      const transformedResults =
        response.data.entry?.map((entry) => {
          const resource = entry.resource;
          const address = resource.address?.[0] || {};

          return {
            id: resource.id,
            odsCode: resource.identifier?.[0]?.value || "",
            name: resource.name,
            nationalGrouping: resource.partOf?.reference || "",
            highLevelHealth: resource.healthcareService?.[0]?.type?.text || "",
            address1: address.line?.[0] || "",
            address2: address.line?.[1] || "",
            address3: address.city || "",
            address4: address.country || "",
            address5: address.state || "",
            postcode: address.postalCode || "",
            openDate:
              resource.extension?.find((e) => e.url.includes("OpenDate"))
                ?.valueDateTime || "",
            closeDate:
              resource.extension?.find((e) => e.url.includes("CloseDate"))
                ?.valueDateTime || "",
            statusCode: resource.active ? "A" : "C",
            orgSubType: resource.type?.[0]?.coding?.[0]?.code || "",
            telephone:
              resource.telecom?.find((t) => t.system === "phone")?.value || "",
            prescribingSetting:
              resource.extension?.find((e) =>
                e.url.includes("PrescribingSetting")
              )?.valueCode || "0",
          };
        }) || [];

      setResults(transformedResults);
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

  const formatAddress = (result) => {
    const parts = [
      result.address1,
      result.address2,
      result.address3,
      result.address4,
      result.postcode,
    ]
      .filter(Boolean)
      .join(", ");
    return parts;
  };

  return (
    <Box sx={{ padding: 2, margin: "auto", width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={query || selectedValue}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for GP or Healthcare Organization"
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
                  key={result.id}
                  sx={{
                    borderBottom: "1px solid #eee",
                    "&:last-child": { borderBottom: "none" },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => {
                    handleSubmit({
                      OrganisationID: result.id,
                      OrganisationCode: result.odsCode,
                      OrganisationName: result.name,
                      NationalGrouping: result.nationalGrouping,
                      HighLevelHealth: result.highLevelHealth,
                      Address1: result.address1,
                      Address2: result.address2,
                      Address3: result.address3,
                      Address4: result.address4,
                      Address5: result.address5,
                      Postcode: result.postcode,
                      OpenDate: result.openDate,
                      CloseDate: result.closeDate,
                      Status: getStatusLabel(result.statusCode),
                      OrganisationSubType: result.orgSubType,
                      telephone: result.telephone,
                      PrescribingSetting: getPrescribingSettingLabel(
                        result.prescribingSetting
                      ),
                    });
                    setSelectedValue(result.name);
                    setResults([]);
                    setQuery("");
                  }}
                >
                  <ListItemText
                    primary={`${result.name} (${result.odsCode})`}
                    secondary={
                      <>
                        {formatAddress(result)}
                        <br />
                        Status: {getStatusLabel(result.statusCode)}
                        {result.telephone && <> • Tel: {result.telephone}</>}
                        <br />
                        Setting:{" "}
                        {getPrescribingSettingLabel(result.prescribingSetting)}
                      </>
                    }
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
                  setResults([]);
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
