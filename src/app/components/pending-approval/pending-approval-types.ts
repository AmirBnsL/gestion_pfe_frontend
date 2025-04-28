import {User} from "@/app/lib/api-client";

export interface Teacher {
    id: number;
    subject: string;
    firstname: string;
    lastname: string;
    birthdate: string; // Represents the ISO date string
    rank: Rank;
    role: TeacherRole; // Use the enum for type safety
    user: User
}

export enum Rank {
    Assistant = 'Assistant',
    Associate = 'Associate',
    Professor = 'Professor',
}

export enum TeacherRole {
    LECTURER = 'LECTURER',
    INSTRUCTOR = 'INSTRUCTOR',
}

export enum StudentStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    GRADUATED = 'GRADUATED',
}

export enum AcademicYear {
    FIRST = '1st preparatory class',
    SECOND = '2nd preparatory class',
    THIRD = '1st superior class',
    FOURTH = '2nd superior class',
    FIFTH = '3rd superior class',
}

export enum StudentJob {
    FRONTEND = 'Front-end',
    BACKEND = 'Back-end',
    FULLSTACK = 'Full-stack',
    DEVOPS = 'DevOps',
    DATA_SCIENTIST = 'Data Scientist',
    DATA_ANALYST = 'Data Analyst',
    GAME_DEV = 'Game Developer',
    MOBILE_DEV = 'Mobile Developer',
    QA = 'Quality Assurance',
    UI_UX = 'UI/UX Designer',
}


// Interface for Student data structure
export interface Student {
    id: number;
    status: StudentStatus; // Use the enum for type safety
    job: StudentJob; // Consider an enum if jobs are predefined
    firstname: string;
    lastname: string;
    birthdate: string; // Represents the ISO date string
    promotionalYear: number;
    academicYear: AcademicYear; // Use the enum for type safety
    group: number;
    specialty: string; // Consider an enum if specialties are predefined
    user : User
}


// Interface for Project data structure
export interface Project {
    id: number;
    title: string;
    description: string;
    startDate: string; // Represents the ISO date string
    endDate: string; // Represents the ISO date string
    specialty: string; // Consider an enum if specialties are predefined
    status: ProjectStatus; // Use the enum for type safety
    createdAt: string; // Represents the ISO date string
    updatedAt: string; // Represents the ISO date string
    rejectionReason: string | null; // Can be a string or null
}


export enum ProjectStatus {
    PROPOSED = 'proposed',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
