'use client'
import React, { useTransition } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { updateParameter } from "./parameters-actions";
import { academicYearLabels, type Parameter } from "./parameters-types";

interface ParameterFormProps {
    parameter: Parameter;
}

export default function ParameterForm({ parameter }: ParameterFormProps) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
            await updateParameter(formData);
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <input type="hidden" name="year" value={parameter.year} />
            <Card className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm pointer-events-none"></div>
                <CardHeader>
                    <CardTitle className="text-white">{academicYearLabels[parameter.year]} Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <Label htmlFor="maxTeamSize" className="text-white">Maximum Team Size</Label>
                        <Input
                            id="maxTeamSize"
                            name="maxTeamSize"
                            type="number"
                            min={1}
                            max={20}
                            defaultValue={parameter.maxTeamSize}
                            className="max-w-xs bg-slate-700 border-slate-600 text-white"
                            disabled={isPending}
                        />
                        <p className="text-sm text-slate-400">
                            The maximum number of students allowed in a team
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="maxTeams" className="text-white">Maximum Team Per Project</Label>
                        <Input
                            id="maxTeams"
                            name="maxTeams"
                            type="number"
                            min={1}
                            max={20}
                            defaultValue={parameter.maxTeams}
                            className="max-w-xs bg-slate-700 border-slate-600 text-white"
                            disabled={isPending}
                        />
                        <p className="text-sm text-slate-400">
                            The maximum number of teams allowed per project
                        </p>
                    </div>

                    {/* Distribution Mode Radio Group */}
                    <div className="space-y-2">
                        <Label className="text-white">Distribution Mode</Label>
                        <div className="flex gap-6 mt-1">
                            <label className="flex items-center gap-2 text-slate-200">
                                <input
                                    type="radio"
                                    name="distributionMode"
                                    value="manual"
                                    defaultChecked={parameter.distributionMode === "manual"}
                                    disabled={isPending}
                                    className="accent-purple-600"
                                />
                                Manual
                            </label>
                            <label className="flex items-center gap-2 text-slate-200">
                                <input
                                    type="radio"
                                    name="distributionMode"
                                    value="automatic"
                                    defaultChecked={parameter.distributionMode === "automatic"}
                                    disabled={isPending}
                                    className="accent-indigo-600"
                                />
                                Automatic
                            </label>
                        </div>
                        <p className="text-sm text-slate-400">
                            Choose how teams are distributed to projects
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between max-w-md">
                            <div className="space-y-0.5">
                                <Label htmlFor="allowTeamCreation" className="text-white">Allow Team Creation</Label>
                                <p className="text-sm text-slate-400">
                                    Students can create new teams
                                </p>
                            </div>
                            <Switch
                                id="allowTeamCreation"
                                name="allowTeamCreation"
                                defaultChecked={parameter.allowTeamCreation}
                                disabled={isPending}
                            />
                        </div>

                        <div className="flex items-center justify-between max-w-md">
                            <div className="space-y-0.5">
                                <Label htmlFor="allowTeamJoining" className="text-white">Allow Team Joining</Label>
                                <p className="text-sm text-slate-400">
                                    Students can join existing teams
                                </p>
                            </div>
                            <Switch
                                id="allowTeamJoining"
                                name="allowTeamJoining"
                                defaultChecked={parameter.allowTeamJoining}
                                disabled={isPending}
                            />
                        </div>

                        <div className="flex items-center justify-between max-w-md">
                            <div className="space-y-0.5">
                                <Label htmlFor="allowWishListCreation" className="text-white">Allow Wish List Creation</Label>
                                <p className="text-sm text-slate-400">
                                    Students can create wish lists for projects
                                </p>
                            </div>
                            <Switch
                                id="allowWishListCreation"
                                name="allowWishListCreation"
                                defaultChecked={parameter.allowWishListCreation}
                                disabled={isPending}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="relative z-10 flex justify-end">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20 px-8 py-2 rounded-md font-semibold transition-all duration-300"
                    >
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}