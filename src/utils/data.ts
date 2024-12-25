import{arrGroupName} from './arrGruopName'
import{regions} from './regions'

export const regionOptions = [
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
    { value: "region", label: "Region" },
  ];

  export const orRegionOrGroupNameOrCityOrCountry = [
    { value: "regionOptions", label: "regionOptions" },
    { value: "groupName", label: "groupName" },
    { value: "region", label: "Region" },
  ];

  export const regionNameOptions =  regions.map((group) => ({
    value: group._id,
    label: group._id,
  }));

  export const groupsNameOptions = arrGroupName.map((group) => ({
    value: group._id,
    label: group._id,
  }));

export const years: string[] = [];
for (let year = 1970; year < 2018; year++) {
  let yearStr =  year.toString();
  years.push(yearStr);
}
  