
import {fetchApi} from "@/app/lib/api-client";

export enum Audience {
    All = "All",
    Students = "Students",
    Teachers = "Teachers",
    Admins = "Admins",
    // Add other relevant audience groups if needed
}

export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Critical = "Critical",
    // Add other relevant priority levels if needed
}


export interface Announcement {
    id: number; // Or string, depending on your backend ID type
    title: string;
    body: string;
    audience: Audience;
    priority: Priority;

}


export async function getAnnocements(): Promise<Announcement[]> {
    return (await fetchApi<Announcement[]>(`/announcements?size=100&page=1`)).data;
}