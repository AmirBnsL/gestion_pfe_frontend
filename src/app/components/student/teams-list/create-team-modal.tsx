"use client"
import { useState, useTransition } from "react"
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
import { Users, GraduationCap, BookOpen, Loader2, AlertCircle } from "lucide-react" // Import AlertCircle
import { type Parameter } from "@/app/components/parameters/parameters-types"
import { createTeam } from "./teamActions"

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  parameter: Parameter
}

export function CreateTeamModal({ isOpen, onClose, parameter }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("")
  const [error, setError] = useState<string | null>(null) // State for error message
  const [isPending, startTransition] = useTransition()

  const handleCreateTeam = () => {
    setError(null); // Clear previous errors
    if (!teamName.trim()) {
      setError("Please enter a team name"); // Set error state instead of alert
      return
    }

    startTransition(async () => {
      try {
        console.log('Attempting to call createTeam with name:', teamName);
        await createTeam(teamName);
        console.log('createTeam call finished successfully.');
        resetForm();

      } catch (err) {
        // Set error state with message from server action
        console.log(err)
        setError(`${err}`);
      }
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    if (error) {
      setError(null); // Clear error when user starts typing
    }
  }

  const resetForm = () => {
    setTeamName("")
    setError(null) // Clear error on close/reset
    onClose()
  }

  const specialtyDisplay = "AI" // Placeholder

  return (
      // Use onOpenChange to call resetForm when the dialog is closed
      <Dialog open={isOpen} onOpenChange={(open) => !open && resetForm()}>
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
                  name="teamName"
                  placeholder="Enter a name for your team"
                  value={teamName}
                  onChange={handleInputChange} // Use updated handler
                  className={`bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35] ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`} // Highlight input on error
                  disabled={isPending}
                  aria-invalid={!!error} // Accessibility improvement
                  aria-describedby={error ? "team-name-error" : undefined}
              />
              {/* Display Error Message */}
              {error && (
                  <p id="team-name-error" className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </p>
              )}
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
                <span>Specialty: <span className="font-medium text-slate-300">{specialtyDisplay}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                <span>Maximum Team Size: <span className="font-medium text-slate-300">{parameter.maxTeamSize} members</span></span>
              </div>
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
                disabled={isPending}
            >
              Cancel
            </Button>
            <Button
                onClick={handleCreateTeam}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-[120px]"
                disabled={isPending || !teamName.trim()}
            >
              {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                  "Create Team"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}