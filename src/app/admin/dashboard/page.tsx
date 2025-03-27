import dynamic from "next/dynamic";

// Dynamically import the DashboardPage component
const DashboardPage = dynamic(() => import("../../components/dashboard/dashboard-page"), {
  loading: () => <p>Loading dashboard...</p>,
  ssr: false, // if you want to disable SSR for this page
});

export default DashboardPage;
