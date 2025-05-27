import { Button } from "@/app/components/ui/button"
import React from "react";
import {SupervisorInvite} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";
import {
    acceptInviteAction,
    rejectInviteAction
} from "@/app/components/teacher/dashboardPage/my-invite-requests/mySupervisorInvitesActions";
import {useRouter} from "next/navigation";

export function MyInviteRequestsView({ inviteRequests }: { inviteRequests: Promise<SupervisorInvite[]> }) {
    // You may want to use useState/useEffect to resolve the promise if this is a client component
    // For simplicity, assume inviteRequests is already resolved as an array
    const resolvedRequests = React.use(inviteRequests);
    console.log(resolvedRequests);
    // Example data structure for InviteRequest:
    // { id: number, projectName: string, inviter: string, date: string }
    const router = useRouter();
    // Replace with your actual fetching logic and state management
    const [requests, setRequests] = React.useState<SupervisorInvite[]>(resolvedRequests);
    React.useEffect(() => {
        inviteRequests.then(setRequests)
    }, [inviteRequests])

    const handleAccept = async (id: number) => {
        await acceptInviteAction(id)
        router.refresh()
    }
    const handleReject = async (id: number) => {
        await rejectInviteAction(id)
        router.refresh()

        // Implement reject logic here
    }

    if (requests.length === 0) {
        return <div className="text-slate-400 text-center py-8">No invite requests.</div>
    }

    return (
        <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full bg-[#181b3a]/80 backdrop-blur-lg rounded-xl border border-[#2A2F52] shadow font-sans">
                <thead>
                <tr className="bg-slate-800/90">
                    <th className="p-4 text-white font-semibold text-base">Project</th>
                    <th className="p-4 text-white font-semibold text-base">Inviter</th>
                    <th className="p-4 text-white font-semibold text-base">Date</th>
                    <th className="p-4 text-white font-semibold text-base">Actions</th>
                </tr>
                </thead>
                <tbody>
                {requests.map(req => (
                    <tr key={req.id} className="even:bg-[#23244d]/60 odd:bg-[#1a1c3a]/60 hover:bg-purple-600/10 transition-colors duration-200">
                        <td className="p-4 text-white">{req.project.title}</td>
                        <td className="p-4 text-white">{req.project.proposedBy.user.email}</td>
                        <td className="p-4 text-white">{req.createdAt}</td>
                        <td className="p-4 flex gap-2">
                            <Button
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-1 rounded-md font-semibold transition-all duration-300"
                                onClick={() => handleAccept(req.id)}
                            >
                                Accept
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-1 rounded-md font-semibold transition-all duration-300"
                                onClick={() => handleReject(req.id)}
                            >
                                Reject
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}