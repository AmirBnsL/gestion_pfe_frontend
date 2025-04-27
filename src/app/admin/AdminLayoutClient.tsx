


import type React from "react"

import { AppSidebar } from "../components/app-sidebar/app-sidebar"
import { AppNavbar } from "../components/app-navbar/page"

import "../../app/globals.css"



export default function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  // Show nothing while checking authentication

    // if (isLoading) {
    //   return <Loading />
    // }
    // if (isError) {
    //   return <Error />


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

  )
}
