"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { FileText } from "lucide-react"
import { projectOverviewData } from "./project-overview-data"

export default function SubmissionHistory() {
  const { submissions } = projectOverviewData

  // Get status color based on submission status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
      <CardContent className="p-4">
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 rounded-lg bg-[#1A1F3D]/50 border border-[#2A2F52] hover:border-purple-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#161A35]">
                  <FileText className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{submission.title}</h3>
                    <Badge variant="outline" className={`${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarImage
                        src={submission.submittedBy.avatar || "/placeholder.svg"}
                        alt={submission.submittedBy.name}
                      />
                      <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                        {submission.submittedBy.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-400">
                      Submitted by {submission.submittedBy.name} on {formatDate(submission.submittedAt)}
                    </span>
                  </div>
                </div>
              </div>
              {submission.feedback && (
                <div className="mt-3 p-3 rounded bg-[#161A35] border border-[#2A2F52]">
                  <p className="text-xs text-slate-400 mb-1">Feedback:</p>
                  <p className="text-sm text-slate-300">{submission.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
