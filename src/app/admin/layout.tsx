import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppSidebar } from "../components/app-sidebar/app-sidebar";
import { AppNavbar } from "../components/app-navbar/page";
import "../../app/globals.css";
import {StudentSidebar} from "@/app/components/student/student-sidebar";
import {StudentNavbar} from "@/app/components/student/student-navbar";

const inter = Inter({ subsets: ["latin"] });

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
          <AppSidebar />
          <main className="flex-1 ml-20">
            <div className="p-6">
              <AppNavbar />
              {children}
            </div>
          </main>
        </div>

  );
}