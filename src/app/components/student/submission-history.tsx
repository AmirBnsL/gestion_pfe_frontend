"use client"

import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

// Sample submission history data
const submissions = [
  {
    id: 1,
    title: "Initial Project Proposal",
    submittedBy: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Sep 15, 2023",
    status: "approved",
    feedback: "Approved with minor revisions. Please proceed to the next phase.",
  },
  {
    id: 2,
    title: "Requirements Document",
    submittedBy: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Oct 1, 2023",
    status: "approved",
    feedback: "Well-documented requirements. Good job!",
  },
  {
    id: 3,
    title: "Design Specifications",
    submittedBy: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Oct 20, 2023",
    status: "needsRevision",
    feedback: "Please add more details to the system architecture section.",
  },
]

// Status badge colors
const statusColors = {
  approved: "bg-green-500/20 text-green-300 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  needsRevision: "bg-red-500/20 text-red-300 border-red-500/30",
}

export function SubmissionHistory() {
  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card
          key={submission.id}
          className="bg-[#1A1F3D] border border-[#2A2F52] shadow-[0_4px_15px_rgba(0,0,0,0.2)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-medium">{submission.title}</h4>
                <div className="flex items-center mt-2">
                  <Avatar className="h-6 w-6 mr-2 border border-slate-700">
                    <AvatarImage
                      src={submission.submittedBy.avatar || "/placeholder.svg"}
                      alt={submission.submittedBy.name}
                    />
                    <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                      {submission.submittedBy.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">
                    Submitted by {submission.submittedBy.name} on {submission.date}
                  </span>
                </div>
              </div>
              <Badge className={statusColors[submission.status as keyof typeof statusColors]}>
                {submission.status === "approved"
                  ? "Approved"
                  : submission.status === "pending"
                    ? "Pending"
                    : "Needs Revision"}
              </Badge>
            </div>
            {submission.feedback && (
              <div className="mt-4 p-3 bg-[#161A35] rounded-md text-sm border border-[#2A2F52]">
                <p className="text-slate-300">{submission.feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
