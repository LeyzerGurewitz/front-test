import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { Navigation } from "@toolpad/core/AppProvider";
import MapIcon from "@mui/icons-material/Map";

export const NAVIGATION: Navigation = [
  { kind: "header", title: "Main items" },
  { segment: "maps", title: "Maps", icon: <MapIcon /> },
  {
    segment: "statistics",
    title: "Statistics",
    icon: <BarChartIcon />,
    children: [
      { segment: "AttackTypes", title: "Attack types", icon: <DescriptionIcon /> },
      { segment: "GroupsByYear", title: "Groups by Year", icon: <DescriptionIcon /> },
      { segment: "IncidentTrends", title: "Incident Trends", icon: <DescriptionIcon /> },
      { segment: "TopGroups", title: "Top Groups", icon: <DescriptionIcon /> },
    ],
  },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      { segment: "sales", title: "Sales", icon: <DescriptionIcon /> },
      { segment: "traffic", title: "Traffic", icon: <DescriptionIcon /> },
    ],
  },
  { segment: "integrations", title: "Integrations", icon: <LayersIcon /> },
];
