import { AcademicYear, type Parameter } from "./parameters-types"

// Mock data for parameters - in a real app, this would come from a database
export const initialParameters: Parameter[] = [
    {
        id: 1,
        maxTeamSize: 5,
        allowTeamCreation: true,
        allowTeamJoining: true,
        allowWishListCreation: true,
        year: AcademicYear.FIRST,
    },
    {
        id: 2,
        maxTeamSize: 4,
        allowTeamCreation: true,
        allowTeamJoining: true,
        allowWishListCreation: false,
        year: AcademicYear.SECOND,
    },
    {
        id: 3,
        maxTeamSize: 6,
        allowTeamCreation: false,
        allowTeamJoining: true,
        allowWishListCreation: true,
        year: AcademicYear.THIRD,
    },
    {
        id: 4,
        maxTeamSize: 3,
        allowTeamCreation: true,
        allowTeamJoining: false,
        allowWishListCreation: true,
        year: AcademicYear.FOURTH,
    },
    {
        id: 5,
        maxTeamSize: 4,
        allowTeamCreation: true,
        allowTeamJoining: true,
        allowWishListCreation: true,
        year: AcademicYear.FIFTH,
    },
]

// Server-side function to get parameters
export async function getParameters(): Promise<Parameter[]> {
    // In a real application, this would fetch from a database
    // For now, we'll just return the mock data

    // Simulate a delay to mimic a database call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return initialParameters
}

// Server-side function to get a parameter by year
export async function getParameterByYear(year: AcademicYear): Promise<Parameter | undefined> {
    const parameters = await getParameters()
    return parameters.find((param) => param.year === year)
}
