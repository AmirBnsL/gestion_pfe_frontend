"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { Inter } from "next/font/google"
import { AppSidebar } from "../components/app-sidebar/app-sidebar"
import { AppNavbar } from "../components/app-navbar/page"
import { useAuth } from "../hooks/use-auth"
import "../../app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and either not authenticated or not an admin, redirect
    if (!isLoading && (!user || user.role !== "Admin")) {
      router.push("/landing")
    }
  }, [user, isLoading, router])

  // Show nothing while checking authentication
  if (isLoading || !user || user.role !== "Admin") {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen items-center justify-center">
            <div className="animate-pulse text-lg">Loading...</div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 ml-20">
            <div className="p-6">
              <AppNavbar />
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
