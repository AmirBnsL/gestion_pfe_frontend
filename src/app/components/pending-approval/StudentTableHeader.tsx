

import { Checkbox } from "@/app/components/ui/checkbox"

interface StudentTableHeaderProps {
    allSelected: boolean
    onSelectAll: (checked: boolean) => void
}

export default function StudentTableHeader({ allSelected, onSelectAll }: StudentTableHeaderProps) {
    return (
        <tr className="border-b border-slate-800">
            <th className="p-4 text-left">
                <Checkbox
                    checked={allSelected}
                    onCheckedChange={onSelectAll}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
            </th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">First Name</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Last Name</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Email</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Role</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Academic Year</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Group</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Specialty</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Status</th>
            <th className="p-4 text-left text-sm font-medium text-slate-300">Action</th>
        </tr>
    )
}
