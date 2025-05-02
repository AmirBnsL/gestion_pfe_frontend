"use client"

import { motion } from "framer-motion"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Check, MoreHorizontal, Trash, User } from "lucide-react"
import type { Student } from "./pending-approval-types"

interface StudentTableRowProps {
    student: Student
    index: number
    isSelected: boolean
    onSelect: (id: string, checked: boolean) => void
    onViewDetails: () => void
}

export default function StudentTableRow({
                                            student,
                                            index,
                                            isSelected,
                                            onSelect,
                                            onViewDetails,
                                        }: StudentTableRowProps) {
    return (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="border-b border-slate-800 hover:bg-slate-800/50 group/row cursor-pointer"
            onClick={(e) => {
                e.preventDefault()
                onViewDetails()
            }}
        >
            <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelect(student.id.toString(), checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
            </td>
            <td className="p-4 font-medium group-hover/row:text-purple-300 transition-colors">{student.firstname}</td>
            <td className="p-4 font-medium group-hover/row:text-purple-300 transition-colors">{student.lastname}</td>
            <td className="p-4 text-sm">{student.user.email}</td>
            <td className="p-4 text-sm">{student.user.role}</td>
            <td className="p-4 text-sm">{student.academicYear}</td>
            <td className="p-4 text-sm">Group {student.group}</td>
            <td className="p-4 text-sm">{student.specialty}</td>
            <td className="p-4">
                <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">{student.status}</Badge>
            </td>
            <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                        <DropdownMenuItem
                            className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                            onClick={onViewDetails}
                        >
                            <User className="h-4 w-4 mr-2" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                            <Check className="h-4 w-4 mr-2 text-green-400" />
                            Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                            <Trash className="h-4 w-4 mr-2 text-red-400" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>
        </motion.tr>
    )
}
