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
        event.preventDefault(); // Prevent default form submission
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
            {/* Keep hidden input for the year */}
            <input type="hidden" name="year" value={parameter.year} />
            <Card>
                <CardHeader>
                    <CardTitle>{academicYearLabels[parameter.year]} Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                        <Input
                            id="maxTeamSize"
                            name="maxTeamSize"
                            type="number"
                            min={1}
                            max={20}
                            defaultValue={parameter.maxTeamSize}
                            className="max-w-xs"
                            disabled={isPending} // Disable input while pending
                        />
                        <p className="text-sm text-muted-foreground">
                            The maximum number of students allowed in a team
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between max-w-md">
                            <div className="space-y-0.5">
                                <Label htmlFor="allowTeamCreation">Allow Team Creation</Label>
                                <p className="text-sm text-muted-foreground">
                                    Students can create new teams
                                </p>
                            </div>
                            <Switch
                                id="allowTeamCreation"
                                name="allowTeamCreation"
                                defaultChecked={parameter.allowTeamCreation}
                                disabled={isPending} // Disable switch while pending
                            />
                        </div>

                        <div className="flex items-center justify-between max-w-md">
                            <div className="space-y-0.5">
                                <Label htmlFor="allowTeamJoining">Allow Team Joining</Label>
                                <p className="text-sm text-muted-foreground">
                                    Students can join existing teams
                                </p>
                            </div>
                            <Switch
                                id="allowTeamJoining"
                                name="allowTeamJoining"
                                defaultChecked={parameter.allowTeamJoining}
                                disabled={isPending} // Disable switch while pending
                            />
                        </div>

                        <div className="flex items-center justify-between max-w-md">
                            <div className="space-y-0.5">
                                <Label htmlFor="allowWishListCreation">Allow Wish List Creation</Label>
                                <p className="text-sm text-muted-foreground">
                                    Students can create wish lists for projects
                                </p>
                            </div>
                            <Switch
                                id="allowWishListCreation"
                                name="allowWishListCreation"
                                defaultChecked={parameter.allowWishListCreation}
                                disabled={isPending} // Disable switch while pending
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending} className="bg-button-purple">
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}