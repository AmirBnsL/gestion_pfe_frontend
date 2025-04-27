import type React from "react"
import type { Metadata } from "next"
import AdminLayoutClient from "./AdminLayoutClient"
import { Inter } from "next/font/google"

// Metadata needs to be in a separate file for server components
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for educational institution",
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return <AdminLayoutClient>{children}</AdminLayoutClient>

}
