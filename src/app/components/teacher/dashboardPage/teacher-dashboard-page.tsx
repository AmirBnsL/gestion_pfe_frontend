'use client'
import { MyProposalsView } from "./my-proposals/my-proposals-view"
import { MySupervisionsView } from "./my-supervisions/my-supervisions-view"
import { MyInviteRequestsView } from "./my-invite-requests/my-invite-requests-view" // <-- new import
import { motion } from "framer-motion"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/app/components/ui/tabs";
import {Project, SupervisorInvite} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export function TeacherDashboardPage({ proposals, supervisions, inviteRequests }: { proposals: Promise<Project[]>, supervisions: Promise<Project[]>, inviteRequests: Promise<SupervisorInvite[]> }) {
  return (
      <div className="min-h-screen bg-[#0F1022] text-white overflow-hidden relative">
        {/* ...ambient effects... */}
        <div className="p-6">
          {/* ...header... */}
          <motion.div /* ...main content... */>
            {/* ...overlay... */}
            <Tabs defaultValue="proposals" className="w-full">
              <TabsList className="z-10 grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
                <TabsTrigger value="proposals" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50">
                  My Proposals
                </TabsTrigger>
                <TabsTrigger value="supervisions" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50">
                  My Supervisions
                </TabsTrigger>
                <TabsTrigger value="invites" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50">
                  Invites Requests
                </TabsTrigger>
              </TabsList>
              <TabsContent value="proposals" className="mt-6">
                <MyProposalsView proposedProjects={proposals} />
              </TabsContent>
              <TabsContent value="supervisions" className="mt-6">
                <MySupervisionsView supervisions={supervisions}/>
              </TabsContent>
              <TabsContent value="invites" className="mt-6">
                <MyInviteRequestsView inviteRequests={inviteRequests} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
  )
}