"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Plus } from "lucide-react"

interface CreatePresentationCardProps {
  onClick: () => void
}

export function CreatePresentationCard({ onClick }: CreatePresentationCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] border-dashed shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Create Presentation Day</h3>
          <p className="text-slate-400 text-center">Add a new presentation schedule</p>
        </div>
      </CardContent>
    </Card>
  )
}
