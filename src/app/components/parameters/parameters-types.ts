export enum AcademicYear {
    FIRST = '1st preparatory class',
    SECOND = '2nd preparatory class',
    THIRD = '1st superior class',
    FOURTH = '2nd superior class',
    FIFTH = '3rd superior class',
}

export const academicYearLabels: Record<AcademicYear, string> = {
    [AcademicYear.FIRST]: "First Year",
    [AcademicYear.SECOND]: "Second Year",
    [AcademicYear.THIRD]: "Third Year",
    [AcademicYear.FOURTH]: "Fourth Year",
    [AcademicYear.FIFTH]: "Fifth Year",
}



export interface Parameter {
    id: number
    maxTeamSize: number
    allowTeamCreation: boolean
    allowTeamJoining: boolean
    allowWishListCreation: boolean
    year: AcademicYear
}
