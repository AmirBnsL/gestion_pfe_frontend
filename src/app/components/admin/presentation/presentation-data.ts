import {AcademicYear} from "@/app/components/parameters/parameters-types";
import {Team} from "@/app/components/student/teams-list/teamTypes";
import {Teacher} from "@/app/components/pending-approval/pending-approval-types";

export interface PresentationDay {
  id: number
  date: string
  academicYear: AcademicYear,
  status: "draft" | "published"
  slots: PresentationSlot[]
}


export interface PresentationSlot {
  team: Team
  room: string
  judges: Teacher[]
  id: number
  startTime: string
  endTime: string
}
