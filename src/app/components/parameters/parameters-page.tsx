import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { AcademicYear, academicYearLabels } from "./parameters-types"
import ParameterForm from "@/app/components/parameters/parameters-form";
import { getAllParameters } from "@/app/components/parameters/parameters-actions";

export default async function ParametersPage() {
    const initialParameters = await getAllParameters()
    return (
        <div className="min-h-screen  p-6">
            <div className="space-y-6">
                <div>
                    
                    <p className="text-slate-400">Manage system parameters for each academic year</p>
                </div>

                <Tabs defaultValue={AcademicYear.FIRST} className="w-full">
                    <TabsList className="mb-6 flex gap-4 bg-transparent">
                        {Object.values(AcademicYear).map((year) => (
                            <TabsTrigger
                                key={year}
                                value={year}
                                className={`
                                    px-6 py-2 rounded-md font-semibold transition-all duration-300
                                    bg-[#161A35]/60 border border-[#2A2F52] text-white shadow
                                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600
                                    data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-purple-900/20
                                    hover:bg-[#23275a] hover:text-white
                                `}
                            >
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
        </div>
    )
}