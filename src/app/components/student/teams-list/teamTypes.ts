
import {
    Student,

} from "@/app/components/pending-approval/pending-approval-types";
import {Project} from "@/app/lib/api-client";

export interface Team {
    id: number;
    project: Project;
    teamLeader: Student;
    specialty: string;
    name: string;
    members: Student[]; // Assuming members have a similar structure to teamLeader
}


