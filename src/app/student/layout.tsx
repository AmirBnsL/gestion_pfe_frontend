
import type React from "react";
import type { Metadata } from "next";
import { AppSidebar } from "../components/app-sidebar/app-sidebar";
import "../../app/globals.css";
import {StudentNavbar} from "@/app/components/student/student-navbar";
import {StudentSidebar} from "@/app/components/student/student-sidebar";



export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for educational institution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <div className="flex min-h-screen">
          <StudentSidebar />
          <main className="flex-1 ml-20">
            <div className="p-6">
              <StudentNavbar />
              {children}
            </div>
          </main>
        </div>

  );
}
