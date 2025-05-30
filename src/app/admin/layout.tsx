import type React from "react";
import type { Metadata } from "next";
import { AppSidebar } from "../components/app-sidebar/app-sidebar";
import { AppNavbar } from "../components/app-navbar/page";
import "../../app/globals.css";


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