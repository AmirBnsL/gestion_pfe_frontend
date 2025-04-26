import type React from "react"
import StudentLayoutClient from "./StudentLayoutClient"
import type { Metadata } from "next"

// Metadata needs to be in a separate file for server components
export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Student project management dashboard",
}

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <StudentLayoutClient children={children} />
}
