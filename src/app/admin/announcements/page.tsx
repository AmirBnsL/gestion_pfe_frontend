import dynamic from "next/dynamic";
import { getAnnocements } from "@/app/components/announcements/announcementActions";

// Dynamically import the AnnouncementsPage component
const AnnouncementsPageClient = dynamic(() => import("../../components/announcements/announcements-page"), {
  loading: () => <p>Loading announcements...</p>,
  ssr: true
});


export default function AnnouncementsPageServer() {

  const announcementsPromise = getAnnocements();


  return <AnnouncementsPageClient announcements={announcementsPromise} />;
}