import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import { AttackType } from "../../types/attackType";

interface AttackTypesProps {
  types: AttackType[];
}

const AttackTypes: React.FC<AttackTypesProps> = ({ types }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Attack Types
      </Typography>
      <PieChart
        series={[
          {
            data: types.map((type) => ({
              id: type._id,
              value: type.totalCasualties,
              label: type._id,
            })),
          },
        ]}
        
        height={300}
      
      />
    </Box>
  );
};

export default AttackTypes;
