"use client"
import { useState, useTransition } from "react" // Import useTransition
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Users, GraduationCap, BookOpen, Loader2 } from "lucide-react" // Import Loader2
import { type Parameter } from "@/app/components/parameters/parameters-types"
import { createTeam } from "./teamActions" // Import the server action

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  parameter: Parameter
}

export function CreateTeamModal({ isOpen, onClose, parameter }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("")
  const [isPending, startTransition] = useTransition() // Initialize useTransition

  const handleCreateTeam = () => {
    // Validate form
    if (!teamName.trim()) {
      alert("Please enter a team name")
      return
    }

    startTransition(async () => {

        console.log('Attempting to call createTeam with name:', teamName);
        await createTeam(teamName);
        // Add this log to see if execution reaches here
        console.log('createTeam call finished successfully.');
        resetForm();
        alert("Team created successfully!"); // Re-enable for confirmation


    });
  }

  const resetForm = () => {
    setTeamName("")
    onClose()
  }

  // Determine specialty display (assuming it might come from parameters or elsewhere)
  // For now, using a placeholder as in the previous version.
  // You might need to adjust how specialty is determined based on your application logic.
  const specialtyDisplay = "AI" // Placeholder - adjust as needed

  return (
      <Dialog open={isOpen} onOpenChange={resetForm}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#161A35]/95 backdrop-blur-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
              Create New Team
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter a name for your new team.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Team Name */}
            <div className="grid gap-2">
              <Label htmlFor="team-name" className="text-slate-300">
                Team Name <span className="text-red-500">*</span>
              </Label>
              <Input
                  id="team-name"
                  name="teamName" // Add name attribute for potential form data usage
                  placeholder="Enter a name for your team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35]"
                  disabled={isPending} // Disable input during transition
              />
            </div>

            {/* Team Info Section */}
            <div className="space-y-3 text-sm text-slate-400 border border-[#2A2F52] bg-[#1A1F3D]/50 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-slate-200">Team Information:</h3>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <span>Academic Year: <span className="font-medium text-slate-300">{parameter.year}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                {/* Adjust specialty display as needed */}
                <span>Specialty: <span className="font-medium text-slate-300">{specialtyDisplay}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                <span>Maximum Team Size: <span className="font-medium text-slate-300">{parameter.maxTeamSize} members</span></span>
              </div>
              {/* Displaying boolean values might need formatting */}
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                <span>Allow team creation: <span className="font-medium text-slate-300">{parameter.allowTeamCreation ? "Yes" : "No"}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                <span>Allow team joining: <span className="font-medium text-slate-300">{parameter.allowTeamJoining ? "Yes" : "No"}</span></span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
                variant="outline"
                onClick={resetForm}
                className="bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
                disabled={isPending} // Disable cancel during transition
            >
              Cancel
            </Button>
            <Button
                onClick={handleCreateTeam}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-[120px]" // Added fixed width
                disabled={isPending || !teamName.trim()} // Disable button during transition or if name is empty
            >
              {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" /> // Show loader when pending
              ) : (
                  "Create Team"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}