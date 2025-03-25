import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import {AppSidebar} from "../components/app-sidebar/app-sidebar"
import "../../app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for educational institution",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 ml-20">{children}</main>
        </div>
      </body>
    </html>
  )
}
