import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AttackTypes from "../../components/statisticsComponents/AttackTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchDeadliestAttackTypes,
} from "../../store/attacks/attacksSlice";

const StatisticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [types, setTypes] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchDeadliestAttackTypes());
      setTypes(data.payload);
     
    };
    fetchData();
  });
  return (
    <Box>
      <AttackTypes types={types} />
    </Box>
  );
};

export default StatisticsPage;
