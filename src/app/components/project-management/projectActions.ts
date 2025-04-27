'use server'

import { cookies } from 'next/headers'
import type { Project } from '@/app/lib/api-client'; // Assuming Project type is defined here

const API_URL = "http://localhost:8080/api"

export async function getProjects(): Promise<Project[]> { // Export the function and add return type
    const cookieStore = await cookies(); // Call cookies() inside the function, no await
    const token = cookieStore.get("jwt")?.value; // Use 'jwt' based on previous context

    if (!token) {
        throw new Error("Authentication token not found.");
    }

    try {
        const res = await fetch(`${API_URL}/projects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Use the retrieved token
            },
        });

        if (!res.ok) {
            // Attempt to get error message from response body
            let errorBody = 'Unknown error';
            try {
                const errorData = await res.json();
                errorBody = errorData.message || JSON.stringify(errorData);
            } catch (parseError) {
                errorBody = await res.text();
            }
            throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}. ${errorBody}`);
        }

        return await res.json(); // await the json parsing

    } catch (e) {
        console.error("Error fetching projects:", e);
        // Re-throw the specific error or a generic one
        if (e instanceof Error) {
            throw e; // Re-throw the original error (could be the one from !res.ok)
        }
        throw new Error("An unexpected error occurred while fetching projects.");
    }
    // Removed the extra closing brace that was here
}