"use client"

import dynamic from "next/dynamic"

const MyProjectPage = dynamic(
  () =>
    import("../../components/student/my-project/my-project-page").then(
      (mod) => mod.MyProjectPage
    ),
  {
    ssr: true, // This enables server-side rendering for MyProjectPage
    
  }
)

export default function MyProject() {
  return <MyProjectPage />
}
