import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { regionNameOptions } from "../../utils/data";
interface SearchTopGroupsProps {
  setOrigenName: (origenName: string) => void;
  setTop5Groups: (top5Groups: boolean) => void;
  top5Groups: boolean;
}
const SearchTopGroups = ({
  setOrigenName,
  setTop5Groups,
  top5Groups,
}: SearchTopGroupsProps) => {
  return (
    <Box>
      <Autocomplete
        disablePortal
        options={regionNameOptions}
        sx={{ width: 300 }}
        onChange={(_, value) => setOrigenName(value?.value || "")}
        renderInput={(params) => (
          <TextField {...params} label="Search by Origin  Name" />
        )}
      />
      <Button onClick={() => setTop5Groups(!top5Groups)}>
        {top5Groups ? "Top 5 Groups" : "All Groups"}
      </Button>
    </Box>
  );
};

export default SearchTopGroups;
