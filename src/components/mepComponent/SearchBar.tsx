import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import {
  groupsNameOptions,
  regionNameOptions,
  regionOptions,
} from "../../utils/data";

interface SearchBarProps {
  setOrigen: (origen: string) => void;
  setGroupName: (groupName: string) => void;
  setOrigenName: (origenName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setOrigen,
  setGroupName,
  setOrigenName,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        padding: 2,
        flexWrap: "wrap",
      }}
    >
      <Autocomplete
        disablePortal
        options={regionOptions}
        sx={{ width: 300 }}
        onChange={(_, value) => setOrigen(value?.value || "")}
        renderInput={(params) => (
          <TextField {...params} label="Search by Region Options" />
        )}
      />
      <Autocomplete
        disablePortal
        options={regionNameOptions}
        sx={{ width: 300 }}
        onChange={(_, value) => setOrigenName(value?.value || "")}
        renderInput={(params) => (
          <TextField {...params} label="Search by Origin  Name" />
        )}
      />
      <Autocomplete
        disablePortal
        options={groupsNameOptions}
        sx={{ width: 300 }}
        onChange={(_, value) => setGroupName(value?.value || "")}
        renderInput={(params) => (
          <TextField {...params} label="Search by Group Name" />
        )}
      />
    </Box>
  );
};

export default SearchBar;
