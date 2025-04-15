import { Avatar } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { MessageSquare } from "lucide-react"
import type { TeamMember } from "./my-project-data"

interface TeamMembersListProps {
  members: TeamMember[]
}

export function TeamMembersList({ members }: TeamMembersListProps) {
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border border-slate-700">
              <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
            </Avatar>
            <div>
              <p className="font-medium text-slate-200 text-sm">{member.name}</p>
              <p className="text-xs text-slate-400">{member.role}</p>
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
