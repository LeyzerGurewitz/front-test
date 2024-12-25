import  { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import { fetchIncidentTrends } from "../../store/attacks/attacksSlice";
import { IncidentTrend } from "../../types/attackType";
import { BarChart } from "@mui/x-charts";
import { years } from "../../utils/data";

const IncidentTrends = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [dataYears, setDataYear] = useState<IncidentTrend[]>([]);
  const [graph, setGraph] = useState<boolean>(false);

  const groupByYear = (data: any[]) => {
    return data.reduce((acc, item) => {
      const year = item.year;
      acc[year] = (acc[year] || 0) + item.incidentCount;
      return acc;
    }, {});
  };

  const groupByMonth = (data: any[]) => {
    return data.reduce((acc, item) => {
      const month = item.month;
      acc[month] = (acc[month] || 0) + item.incidentCount;
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchData = async () => {
      if (startYear && endYear) {
        const data = await dispatch(
          fetchIncidentTrends({ startYear, endYear })
        );
        setDataYear(data.payload);
        setGraph(data.payload.length > 0);
      }
    };

    fetchData();
  }, [startYear, endYear, dispatch]);

  const isYearGrouping = startYear !== endYear;
  const groupedData = isYearGrouping
    ? groupByYear(dataYears)
    : groupByMonth(dataYears);

 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Autocomplete
        disablePortal
        options={years}
        sx={{ width: 150 }}
        onChange={( value) => setStartYear(Number(value) || 0)}
        renderInput={(params) => <TextField {...params} label="Start Year" />}
      />
      <Autocomplete
        disablePortal
        options={
          startYear
            ? Array.from({ length: 2018 - startYear }, (_, i) =>
                (startYear + i).toString()
              )
            : []
        }
        sx={{ width: 150 }}
        onChange={( value) => setEndYear(Number(value) || 0)}
        renderInput={(params) => <TextField {...params} label="End Year" />}
      />
      <Button
        onClick={() =>
          startYear && endYear
            ? setGraph(true)
            : alert("Please enter valid years")
        }
      >
        Enter
      </Button>
      <ButtonGroup variant="contained">
        <Button
          onClick={() => {
            setStartYear(2017);
            setEndYear(2017);
            setGraph(true);
          }}
        >
          Year
        </Button>
        <Button
          onClick={() => {
            setStartYear(2012);
            setEndYear(2017);
            setGraph(true);
          }}
        >
          Five years
        </Button>
        <Button
          onClick={() => {
            setStartYear(2007);
            setEndYear(2017);
            setGraph(true);
          }}
        >
          Ten years
        </Button>
      </ButtonGroup>

      {graph && (
        <Box sx={{ width: "88%", marginTop: "1rem", height: "400px" }}>
          <BarChart
            width={500}
            height={300}
            series={[{ data: Object.values(groupedData) }]}
            xAxis={[{ data: Object.keys(groupedData), scaleType: "band" }]}
          />
        </Box>
      )}
    </Box>
  );
};

export default IncidentTrends;
