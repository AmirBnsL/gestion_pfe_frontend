"use client"

import dynamic from "next/dynamic"

const PendingApprovalsPage = dynamic(() => import("@/app/components/pending-approval/pending-approvals-page").then(mod => mod.PendingApprovalsPage))

export default function PendingApprovals() {
  return <PendingApprovalsPage />
}
