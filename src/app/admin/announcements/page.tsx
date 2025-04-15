import dynamic from "next/dynamic";


const Announcements = dynamic(() => import("../../components/announcements/announcements-page"), {
  loading: () => <p>Loading dashboard...</p>,
  ssr:true
 
});

export default Announcements ;
