import { Avatar } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { MessageSquare } from "lucide-react"

import {Student} from "@/app/components/pending-approval/pending-approval-types";

interface TeamMembersListProps {
  members: { id: string; joinedAt:Date, student: Student }[]
}

export function TeamMembersList({ members }: TeamMembersListProps) {
  console.log(members)
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div key={member.student.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={"/placeholder.svg"} alt={member.student.firstname} />
            </Avatar>
            <div>
              <p className="font-medium text-slate-200 text-sm">{member.student.firstname +" " +member.student.lastname}</p>
              <p className="text-xs text-slate-400">{member.student.job}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Message</span>
          </Button>
        </div>
      ))}
    </div>
  )
}
