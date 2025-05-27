import { getSlotAsStudent } from "@/app/components/admin/presentation/presentationActions"

export default async function StudentPresentationDayPage() {
  const data = await getSlotAsStudent()
  const day = data?.presentationDay

  if (!data || !day) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
          <p className="text-slate-400 text-lg font-medium">No presentation scheduled.</p>
        </div>
    )
  }

  return (
      <div className="min-h-screen flex items-start justify-center bg-gradient-to-br ">
        <div className="w-full max-w-4xl px-4">
          <div className="overflow-x-auto rounded-2xl shadow-2xl">
            <table className="w-full bg-[#181b3a]/80 backdrop-blur-lg rounded-2xl border border-[#2A2F52] shadow-lg font-sans">
              <thead>
              <tr className="bg-slate-800/90">
                <th className="p-6 text-white font-semibold text-lg rounded-tl-2xl">name</th>
                <th className="p-6 text-white font-semibold text-lg">specialty</th>
                <th className="p-6 text-white font-semibold text-lg">date</th>
                <th className="p-6 text-white font-semibold text-lg">room</th>
                <th className="p-6 text-white font-semibold text-lg">startTime</th>
                <th className="p-6 text-white font-semibold text-lg rounded-tr-2xl">endTime</th>
              </tr>
              </thead>
              <tbody>
              <tr className="even:bg-[#23244d]/60 odd:bg-[#1a1c3a]/60 hover:bg-purple-600/10 transition-colors duration-200">
                <td className="p-6 text-white font-medium text-base">{data.name}</td>
                <td className="p-6 text-white font-medium text-base">{data.specialty}</td>
                <td className="p-6 text-white font-medium text-base">{day.presentationDay.date ?? "—"}</td>
                <td className="p-6 text-white font-medium text-base">{day.room}</td>
                <td className="p-6 text-white font-medium text-base">{day.startTime}</td>
                <td className="p-6 text-white font-medium text-base">{day.endTime}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}