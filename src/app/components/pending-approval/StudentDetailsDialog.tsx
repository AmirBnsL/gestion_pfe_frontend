"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/app/components/ui/dialog"
import { Badge } from "@/app/components/ui/badge"
import { Student } from "./pending-approval-types"

interface StudentDetailsDialogProps {
    student: Student
    onClose: () => void
}

export default function StudentDetailsDialog({
                                                 student,
                                                 onClose,
                                             }: StudentDetailsDialogProps) {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Student Details</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        View more information about this student.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                    <div>
                        <span className="text-slate-400">Full Name: </span>
                        <span className="text-white font-medium">
              {student.firstname} {student.lastname}
            </span>
                    </div>
                    <div>
                        <span className="text-slate-400">Email: </span>
                        <span className="text-white font-medium">{student.user.email}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Role: </span>
                        <span className="text-white font-medium">{student.user.role}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Academic Year: </span>
                        <span className="text-white font-medium">{student.academicYear}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Group: </span>
                        <span className="text-white font-medium">{student.group}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Specialty: </span>
                        <span className="text-white font-medium">{student.specialty}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Status: </span>
                        <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">
                            {student.status}
                        </Badge>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
