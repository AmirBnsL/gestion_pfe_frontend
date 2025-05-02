'use server'

import { fetchApi} from "@/app/lib/api-client";
import {Teacher,Student} from "@/app/components/pending-approval/pending-approval-types";


export async function getTeachers() {
    return  (await fetchApi<Teacher[]>('/teachers?page=1&size=100')).data
}

export async function getStudents() {
    return  (await fetchApi<Student[]>('/students?page=1&size=100')).data
}


