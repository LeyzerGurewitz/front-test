import { Box } from "@mui/material";
import React from "react";
import IncidentTrends from "../../components/statisticsComponents/IncidentTrends";

export const IncidentTrendsPage = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <IncidentTrends />
    </Box>
  );
};