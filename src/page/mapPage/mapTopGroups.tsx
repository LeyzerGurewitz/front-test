import { Box } from "@mui/material";
import  { useEffect, useState } from "react";
import GoogleMapComponent from "../../components/mepComponent/GoogleMapComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchTopGroups } from "../../store/attacks/attacksSlice";
import { CasualtyRegion, GroupData, TheBigGestGroup } from "../../types/attackType";
import SearchTopGroups from "../../components/mepComponent/SearchTopGroups";

const mapTopGroups = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [origenName, setOrigenName] = useState("");
  const [top5Groups, setTop5Groups] = useState(false);
  const [attack, setAttack] = useState<
    CasualtyRegion[] | GroupData[] | TheBigGestGroup[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      if (origenName) {
        const data = await dispatch(fetchTopGroups(origenName));
        setAttack(data.payload);
      }
    };
    fetchData();
  }, [dispatch, origenName]);
  return (
    <Box>
      <GoogleMapComponent attack={attack} />
      <SearchTopGroups setOrigenName={setOrigenName} top5Groups={top5Groups} setTop5Groups={setTop5Groups} />
    </Box>
  );
};

export default mapTopGroups;
