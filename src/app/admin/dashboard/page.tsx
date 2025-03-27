import dynamic from "next/dynamic";

// Dynamically import the DashboardPage component
const DashboardPage = dynamic(() => import("../../components/dashboard/dashboard-page"), {
  loading: () => <p>Loading dashboard...</p>,
 
});

export default DashboardPage;
