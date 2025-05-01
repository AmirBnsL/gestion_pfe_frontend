"use server"

import {revalidatePath} from "next/cache"
import type {Parameter} from "./parameters-types"

import {BackendSuccessResponse, fetchApi} from "@/app/lib/api-client";

export async function updateParameter(parameter: FormData): Promise<{ success: boolean; message: string }> {
    try {
        // In a real application, this would be a database update
        // For now, we'll just simulate a successful update

        //convert formdata into parameter object
        const updatedParameter: Parameter = {
            id: Number(parameter.get("id")),
            maxTeamSize: Number(parameter.get("maxTeamSize")),
            allowTeamCreation: parameter.get("allowTeamCreation") === "on",
            allowTeamJoining: parameter.get("allowTeamJoining") === "on",
            allowWishListCreation: parameter.get("allowWishListCreation") === "on",
            year: parameter.get("year") as unknown as Parameter["year"],
        }

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(updatedParameter),
            headers: {
                "Content-Type": "application/json",
            },
        }
        // Simulate a delay to mimic a real API call
        await fetchApi<BackendSuccessResponse<string>>("/parameter", requestOptions)
        // Revalidate the parameters page to refresh the data
        revalidatePath("/admin/parameters")

        return {
            success: true,
            message: `Parameters for ${updatedParameter.year} updated successfully`,
        }
    } catch (error) {
        console.error("Error updating parameter:", error)
        return {
            success: false,
            message: "Failed to update parameters. Please try again.",
        }
    }
}


export async function getAllParameters(): Promise<Parameter[]> {
        return (await fetchApi<Parameter[]>("/parameters", {
            method: "GET",
        })).data

}

