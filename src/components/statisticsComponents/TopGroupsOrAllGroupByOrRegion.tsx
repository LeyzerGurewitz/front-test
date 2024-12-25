import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchTopGroups } from "../../store/attacks/attacksSlice";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { regionNameOptions } from "../../utils/data";
import { BarChart } from "@mui/x-charts";
import { GroupData } from "../../types/attackType";

const TopGroupsOrAllGroupByOrRegion = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [origin, setOrigin] = useState("");
  const [topGroups, setTopGroup] = useState<boolean>(false);
  const [dataGroups, setDataGroup] = useState<GroupData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (origin) {
        const data = await dispatch(fetchTopGroups(origin));
        setDataGroup(data.payload);
      }
    };
    fetchData();
    dataGroups.forEach((group) => console.log(group));
  }, [dispatch, origin]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button onClick={() => setTopGroup(!topGroups)}>
        {topGroups ? "Top 5 Groups" : "All Groups"}
      </Button>
      <Autocomplete
        disablePortal
        options={regionNameOptions}
        sx={{ width: 300 }}
        onChange={(_, value) => setOrigin(value?.value || "")}
        renderInput={(params) => (
          <TextField {...params} label="Search by Origin  Name" />
        )}
      />

      <BarChart
        width={500}
        height={300}
        series={[
          {
            data: dataGroups.map((group) => group.incidentCount),
          },
        ]}
        xAxis={[
          {
            data: dataGroups.map((group) => group._id),
            scaleType: "band",
          },
        ]}
      />
    </Box>
  );
};

export default TopGroupsOrAllGroupByOrRegion;
