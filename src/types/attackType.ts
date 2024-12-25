export type RequestStatus = "Idle" | "Pending" | "Rejected" | "Fulfilled";

export interface AttackType {
  _id: string;
  totalCasualties: number;
}

export interface CasualtyRegion {
  avgEvents: number;
  latitude: number;
  longitude: number;
  region: string;
  fullData: {
    _id: string;
    eventid: number;
    iyear: number;
    imonth: number;
    iday: number;
    country_txt: string;
    region_txt: string;
    city: string;
    latitude: number;
    longitude: number;
    attacktype1_txt: string;
    targtype1_txt: string;
    target1: string;
    gname: string;
    weaptype1_txt: string;
    nkill: number;
    nwound: number;
    nperps: number | null;
    summary: string | null;
    __v: number;
  };
}


export interface IncidentTrend {
    incidentCount: number;
    year: number;
    month: number;
  }

export  interface GroupData {
    _id: string;        
    incidentCount: number; 
    latitude: number;     
    longitude: number;     
  }

 export interface GroupIncident {
    _id: string;
    totalIncidents: number;
  }

export interface TheBigGestGroup {
    totalCasuals: number; 
    latitude: number; 
    longitude: number; 
    region: string;
  }  