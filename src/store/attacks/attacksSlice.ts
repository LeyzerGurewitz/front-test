import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AttackType,
  CasualtyRegion,
  GroupData,
  GroupIncident,
  IncidentTrend,
  RequestStatus,
  TheBigGestGroup,
} from "../../types/attackType";

const BASE_URL = import.meta.env.VITE_BASE_URL;
interface AttackState {
  attackData: AttackType[];
  casualtyRegions: CasualtyRegion[];
  incidentTrends: IncidentTrend[];
  groupData: GroupData[];
  groupIncident: GroupIncident[];
  theBigGestGroup: TheBigGestGroup[];
  Status: RequestStatus;
  error: string | null;
}

const initialState: AttackState = {
  attackData: [],
  casualtyRegions: [],
  incidentTrends: [],
  groupData: [],
  groupIncident: [],
  theBigGestGroup: [],
  Status: "Idle",
  error: null,
};

export const fetchDeadliestAttackTypes = createAsyncThunk(
  "attacks/fetchDeadliestAttackTypes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}deadliest-attack-types`);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const fetchHighestCasualtyRegions = createAsyncThunk(
  "attacks/fetchHighestCasualtyRegions",
  async (origin: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}highest-casualty-regions?query=${origin}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const fetchIncidentTrends = createAsyncThunk(
  "incidentTrends/fetchIncidentTrends",
  async (
    { startYear, endYear }: { startYear: number; endYear: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}incident-trends?startYear=${startYear}&endYear=${endYear}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const fetchTopGroups = createAsyncThunk(
  "topGroups/fetchTopGroups",
  async (region: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}top-groups?region=${region}&filter=all`
      );
      console.log("response", response.data.data);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const fetchGroupIncidentsByYear = createAsyncThunk(
  "groups/fetchGroupIncidentsByYear",
  async (year: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}groups-by-year?year=${year}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

export const fetchDeadliestRegionsGroupName = createAsyncThunk(
  "deadliestRegions/fetchDeadliestRegionsGroupName",
  async (groupName: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}deadliest-regions?groupName=${groupName}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

const attackSlice = createSlice({
  name: "attacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchDeadliestAttackTypes.pending, (state) => {
        state.Status = "Pending";
        state.error = "";
      })
      .addCase(fetchDeadliestAttackTypes.fulfilled, (state, action) => {
        state.Status = "Fulfilled";
        state.attackData = action.payload;
      })
      .addCase(fetchDeadliestAttackTypes.rejected, (state, action) => {
        state.Status = "Rejected";
        state.error = action.payload as string;
      })

      .addCase(fetchHighestCasualtyRegions.pending, (state) => {
        state.Status = "Pending";
        state.error = "";
      })
      .addCase(fetchHighestCasualtyRegions.fulfilled, (state, action) => {
        state.Status = "Fulfilled";
        state.casualtyRegions = action.payload;
      })
      .addCase(fetchHighestCasualtyRegions.rejected, (state, action) => {
        state.Status = "Rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchIncidentTrends.pending, (state) => {
        state.Status = "Pending";
        state.error = "";
      })
      .addCase(fetchIncidentTrends.fulfilled, (state, action) => {
        state.Status = "Fulfilled";
        state.incidentTrends = action.payload;
      })
      .addCase(fetchIncidentTrends.rejected, (state, action) => {
        state.Status = "Rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchTopGroups.pending, (state) => {
        state.Status = "Pending";
        state.error = "";
      })
      .addCase(fetchTopGroups.fulfilled, (state, action) => {
        state.Status = "Fulfilled";
        state.groupData = action.payload;
      })
      .addCase(fetchTopGroups.rejected, (state, action) => {
        state.Status = "Rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchGroupIncidentsByYear.pending, (state) => {
        state.Status = "Pending";
        state.error = "";
      })
      .addCase(fetchGroupIncidentsByYear.fulfilled, (state, action) => {
        state.Status = "Fulfilled";
        state.groupIncident = action.payload;
      })
      .addCase(fetchGroupIncidentsByYear.rejected, (state, action) => {
        state.Status = "Rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchDeadliestRegionsGroupName.pending, (state) => {
        state.Status = "Pending";
        state.error = "";
      })
      .addCase(fetchDeadliestRegionsGroupName.fulfilled, (state, action) => {
        state.Status = "Fulfilled";
        state.theBigGestGroup = action.payload;
      })
      .addCase(fetchDeadliestRegionsGroupName.rejected, (state, action) => {
        state.Status = "Rejected";
        state.error = action.payload as string;
      });
  },
});

export default attackSlice.reducer;
