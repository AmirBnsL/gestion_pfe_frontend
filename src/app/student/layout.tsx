import type React from "react"
import { StudentSidebar } from "../components/student/student-sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Student project management dashboard",
}

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 ml-20 bg-[#0F1022] text-white overflow-hidden relative">
        {/* Enhanced ambient light effects */}
        <div className="fixed top-1/4 right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse" />
        <div
          className="fixed bottom-1/4 left-1/4 w-1/3 h-1/3 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="fixed top-1/3 left-1/3 w-1/4 h-1/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
