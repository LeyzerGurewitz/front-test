import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { years } from "../../utils/data";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchGroupIncidentsByYear } from "../../store/attacks/attacksSlice";
import { PieChart } from "@mui/x-charts";
import { GroupIncident } from "../../types/attackType";

const GroupsByYear = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [byYear, setByYear] = useState<number>(2017);
  const [dataGroupByYear, setDataGroupByYear] = useState<GroupIncident[]>([]);

 
  useEffect(() => {
    const fetchData = async () => {
      if (byYear) {
        const data = await dispatch(fetchGroupIncidentsByYear(byYear));
        setDataGroupByYear(data.payload);
        dataGroupByYear.forEach((group) => console.log(group));
      }
    };

    fetchData();
  }, [dispatch, byYear]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
       
      }}
    >
      <Typography variant="h6" gutterBottom alignItems={"center"}>
        Group By Year
      </Typography>
      <Autocomplete
        disablePortal
        options={years}
        sx={{ width: 150 }}
        onChange={
          ( value) => setByYear(Number(value) || 0) 
        }
        renderInput={(params) => (
          <TextField {...params} label="Search by Year" />
        )}
      />
      <PieChart
        series={[
          {
            data: dataGroupByYear.map((group) => ({
              id: group._id,
              value: group.totalIncidents,
              label: group._id , 
            })),
          },
        ]}
        width={400}
        height={300}
        
      />
    </Box>
  );
};

export default GroupsByYear;
