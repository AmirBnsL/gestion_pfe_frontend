import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

import { AcademicYear, type Parameter, academicYearLabels } from "./parameters-types"
import ParameterForm from "@/app/components/parameters/parameters-form";

interface ParametersPageProps {
    initialParameters: Parameter[]
}

export default function ParametersPage({ initialParameters }: ParametersPageProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Parameters</h1>
                <p className="text-muted-foreground">Manage system parameters for each academic year</p>
            </div>

            <Tabs defaultValue={AcademicYear.FIRST} className="w-full">
                <TabsList className="mb-6">
                    {Object.values(AcademicYear).map((year) => (
                        <TabsTrigger key={year} value={year}>
                            {academicYearLabels[year]}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {Object.values(AcademicYear).map((year) => {
                    const parameter = initialParameters.find((p) => p.year === year)
                    if (!parameter) return null

                    return (
                        <TabsContent key={year} value={year}>
                            <ParameterForm parameter={parameter} />
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    )
}
