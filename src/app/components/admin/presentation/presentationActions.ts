'use server'




import {fetchApi} from "@/app/lib/api-client";

import {PresentationDay, PresentationSlot} from "@/app/components/admin/presentation/presentation-data";

export const getPresentationDays = async () => {

    return (await fetchApi<PresentationDay[]>(`/presentationDays`)).data

}



export async function createPresentationDayAction({
                                                      date,
                                                      status,
                                                      academicYear,
                                                  }: {
    date: string;
    status: "draft" | "published";
    academicYear: string;
}):Promise<PresentationDay> {
    return (await fetchApi<PresentationDay>("/presentationDay", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({date, status, academicYear}),
    })).data;
}

export async function addSlotToPresentationDayAction({
                                                         dayId,
                                                         slot,
                                                     }: {
    dayId: string;
    slot: {
        startTime: string;
        endTime: string;
        room: string;
        teamId: number;
        judges: number[]; // Assuming judges is an array of ids
    }
}) {

    console.log({
        dayId,
        slot
    })


    return await fetchApi<string>(`/presentationDay/${dayId}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            startTime: slot.startTime,
            endTime: slot.endTime,
            room: slot.room,
            teamId: slot.teamId,
            judges: slot.judges
        }),
    });
}



export async function getSlotsByDayIdAction(dayId: string): Promise<PresentationSlot[]> {
    return (await fetchApi<PresentationSlot[]>(`/presentationDay/${dayId}/slots`)).data;
}