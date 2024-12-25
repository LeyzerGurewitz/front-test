import { useEffect, useState } from "react";
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
  const [groupBy, setGroupBy] = useState<boolean>(false);
  const [endYears, setEndYears] = useState<string[]>([]);

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
      if (startYear && endYear && graph) {
        const data = await dispatch(
          fetchIncidentTrends({ startYear, endYear })
        );
        setDataYear(data.payload);
        setGroupBy(true);
        setGraph(false);
      }

      if (startYear) {
        const endYears = years.filter((year) => +year > startYear);
        setEndYears(endYears);
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
        onChange={(value) => setStartYear(Number(value))}
        renderInput={(params) => <TextField {...params} label="Start Year" />}
      />
      <Autocomplete
        disablePortal
        options={endYears ? endYears : []}
        sx={{ width: 150 }}
        onChange={(value) => setEndYear(Number(value))}
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

      {groupBy && (
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
