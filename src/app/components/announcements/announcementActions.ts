
import {fetchApi} from "@/app/lib/api-client";

export enum Audience {
    ALL = "ALL",
    STUDENTS = "STUDENTS",
    TEACHERS = "TEACHERS",
    ADMINS = "ADMINS",
    // Add other relevant audience groups if needed
}

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
  
    // Add other relevant priority levels if needed
}


export interface Announcement {
    id: number; // Or string, depending on your backend ID type
    title: string;
    body: string;
    audience: Audience;
    priority: Priority;

}


export async function handleCreateAnnouncement(announcementData: Partial<Announcement>): Promise<Announcement> {
    return (await fetchApi<Announcement>("/announcement", {
        method: "POST",
        body: JSON.stringify(announcementData),
    })).data;
}

export async function getAnnouncements(): Promise<Announcement[]> {
    return (await fetchApi<Announcement[]>(`/announcements?size=100&page=1`)).data
}