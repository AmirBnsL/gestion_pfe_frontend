"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"

interface ApprovalHistoryProps {
  approvalHistory: any[]
}

export function ApprovalHistory({ approvalHistory }: ApprovalHistoryProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
        Recent Approval History
      </h2>

      <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-sm"></div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-4 text-left text-sm font-medium text-slate-300">Name</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Type</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Action</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Date</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Approved By</th>
              </tr>
            </thead>
            <tbody>
              {approvalHistory.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className="border-b border-slate-800 hover:bg-slate-800/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback className="bg-slate-700 text-slate-300">{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <Badge
                      className={`
                      ${
                        item.type === "Student"
                          ? "bg-blue-500/20 text-blue-300"
                          : item.type === "Teacher"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-emerald-500/20 text-emerald-300"
                      }
                    `}
                    >
                      {item.type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      className={`
                      ${item.action === "Approved" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                    `}
                    >
                      {item.action}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm">{item.date}</td>
                  <td className="p-4 text-sm">{item.approvedBy}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

