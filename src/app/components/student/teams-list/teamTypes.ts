
import {
    Student,

} from "@/app/components/pending-approval/pending-approval-types";

export interface Team {
    id: number;
    teamLeader: Student;
    specialty: string;
    name: string;
    members: Student[]; // Assuming members have a similar structure to teamLeader
}


