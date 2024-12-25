import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { NAVIGATION } from "../Navigation/NavigationConfig";
import { demoTheme } from "../../theme/ThemeConfig";
import { useDemoRouter } from "../../RouterProvider/RouterProvider";
import MapsPage from "../../page/mapPage/mapPage";
import StatisticsPage from "../../page/statisticsPage/StatisticsPage;";
import GroupsByYearPage from "../../page/statisticsPage/GroupsByYearPage";
import { IncidentTrendsPage } from "../../page/statisticsPage/IncidentTrendsPage";
import TopGroupPage from "../../page/statisticsPage/TopGroupPage";

const DashboardLayoutBasic: React.FC = () => {
  const router = useDemoRouter("/dashboard");

  const currentPath = router.pathname;

  const renderContent = () => {
    switch (currentPath) {
      case "/maps":
        return <MapsPage />;
      case "/statistics/AttackTypes":
        return <StatisticsPage />;
      case "/statistics/GroupsByYear":
        return <GroupsByYearPage />;
      case "/statistics/IncidentTrends":
        return <IncidentTrendsPage />;
      case "/statistics/TopGroups":
        return <TopGroupPage />;
      default:
        return <MapsPage />;
    }
  };

  return (
    <AppProvider
      branding={{ title: "leyzer" }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer title="">{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutBasic;
