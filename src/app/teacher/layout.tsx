import type React from "react";
import type { Metadata } from "next";
import "../../app/globals.css";
import { TeacherSidebar } from "@/app/components/teacher/teacherSideNavbar";
import { TeacherNavbar } from "@/app/components/teacher/teachNavbar";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
  description: "Teacher dashboard for educational institution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 ml-20">
        <div className="p-6">
          <TeacherNavbar />
          {children}
        </div>
      </main>
    </div>
  );
}