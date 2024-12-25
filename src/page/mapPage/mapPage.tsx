import { useEffect, useState } from "react";
import GoogleMapComponent from "../../components/mepComponent/GoogleMapComponent";
import { Box } from "@mui/material";
import SearchBar from "../../components/mepComponent/SearchBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchDeadliestRegionsGroupName,
  fetchHighestCasualtyRegions,
  fetchTopGroups,
} from "../../store/attacks/attacksSlice";
import {
  CasualtyRegion,
  GroupData,
  TheBigGestGroup,
} from "../../types/attackType";

const MapPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [origen, setOrigen] = useState("");
  const [groupName, setGroupName] = useState("");
  const [origenName, setOrigenName] = useState("");
  const [attack, setAttack] = useState<
    CasualtyRegion[] | GroupData[] | TheBigGestGroup[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      if (origen) {
        const data = await dispatch(fetchHighestCasualtyRegions(origen));
        setAttack(data.payload);

      }
      if (groupName) {
        const data = await dispatch(fetchDeadliestRegionsGroupName(groupName));
      
        setAttack(data.payload);
      }
      if (origenName) {
        const data = await dispatch(fetchTopGroups(origenName));
        setAttack(data.payload);
      }
    };
    fetchData();
  }, [dispatch, origen, groupName, origenName]);
  console.log(attack);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <SearchBar
        setOrigen={setOrigen}
        setGroupName={setGroupName}
        setOrigenName={setOrigenName}
      />
      <GoogleMapComponent attack={attack} /> 
    </Box>
  );
};

export default MapPage;
