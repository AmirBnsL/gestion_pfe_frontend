"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { MyProposalsView } from "./my-proposals/my-proposals-view"
import { MySupervisionsView } from "./my-supervisions/my-supervisions-view"
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export function TeacherDashboardPage({proposals,supervisions}: { proposals: Promise<Project[]>,supervisions: Promise<Project[]> }) {
  return (
    <div className="min-h-screen bg-[#0F1022] text-white overflow-hidden relative">
      {/* Enhanced ambient light effects */}
      <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div
        className="fixed top-3/4 right-1/4 w-1/3 h-1/3 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed bottom-1/4 left-1/3 w-1/4 h-1/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
  
          <p className="text-slate-400 mt-2">Manage your proposals and supervisions</p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group"
        >
          {/* Overlay with pointer-events-none so it doesn't block clicks */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm pointer-events-none"></div>

          <Tabs defaultValue="proposals" className="w-full">
            <TabsList className="z-10 grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
              <TabsTrigger
                value="proposals"
                className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50"
              >
                My Proposals
              </TabsTrigger>
              <TabsTrigger
                value="supervisions"
                className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50"
              >
                My Supervisions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="proposals" className="mt-6">
              <MyProposalsView proposedProjects={proposals} />
            </TabsContent>

            <TabsContent value="supervisions" className="mt-6">
              <MySupervisionsView supervisions={supervisions}/>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}