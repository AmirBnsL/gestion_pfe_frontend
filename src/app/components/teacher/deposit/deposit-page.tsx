"use client"

import { useState, useEffect, useTransition } from "react"
import { motion } from "framer-motion"
import { Save, Send, Edit, Trash2, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Card } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import {depositsData, type Deposit, Specialty, AcademicYear} from "./deposit-data"
import { depositProject } from "./depositActions"

const specialties = Object.values(Specialty)

const years = Object.values(AcademicYear)

export function DepositPage() {
  const [deposits, setDeposits] = useState<Deposit[]>(depositsData)
  const [currentDeposit, setCurrentDeposit] = useState<Partial<Deposit>>({
    title: "",
    description: "",
    year: "",
    specialty: "",
    status: "draft",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [titleError, setTitleError] = useState("")
  const [characterCount, setCharacterCount] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const maxCharacters = 2000

  useEffect(() => {
    setCharacterCount(currentDeposit.description?.length || 0)
  }, [currentDeposit.description])

  const validateTitle = (title: string) => {
    const existingTitles = deposits.filter((d) => d.id !== editingId).map((d) => d.title.toLowerCase())

    if (existingTitles.includes(title.toLowerCase())) {
      setTitleError("This title already exists. Please choose a unique title.")
      return false
    }
    setTitleError("")
    return true
  }

  const handleTitleChange = (title: string) => {
    setCurrentDeposit((prev) => ({ ...prev, title }))
    if (title) {
      validateTitle(title)
    } else {
      setTitleError("")
    }
  }

  const handleDescriptionChange = (description: string) => {
    if (description.length <= maxCharacters) {
      setCurrentDeposit((prev) => ({ ...prev, description }))
    }
  }

  const resetForm = () => {
    setCurrentDeposit({
      title: "",
      description: "",
      year: "",
      specialty: "",
      status: "draft",
    })
    setIsEditing(false)
    setEditingId(null)
    setTitleError("")
  }

  const saveDraft = () => {
    if (!currentDeposit.title?.trim()) {
      setTitleError("Title is required")
      return
    }

    if (!validateTitle(currentDeposit.title)) {
      return
    }

    const depositData: Deposit = {
      id: editingId || `deposit-${Date.now()}`,
      title: currentDeposit.title,
      description: currentDeposit.description || "",
      year: currentDeposit.year || "",
      specialty: currentDeposit.specialty || "",
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (isEditing && editingId) {
      setDeposits((prev) => prev.map((d) => (d.id === editingId ? depositData : d)))
    } else {
      setDeposits((prev) => [...prev, depositData])
    }

    resetForm()
  }

  const submitForApproval = () => {
    if (
      !currentDeposit.title?.trim() ||
      !currentDeposit.description?.trim() ||
      !currentDeposit.year ||
      !currentDeposit.specialty
    ) {
      return
    }

    if (!validateTitle(currentDeposit.title)) {
      return
    }

    setSubmitError(null)
    setSubmitSuccess(null)

    startTransition(async () => {
      try {
        // Call the server action
        await depositProject({
          title: currentDeposit.title!,
          description: currentDeposit.description!,
          specialty: currentDeposit.specialty as Specialty, // adjust type if needed
        })
        setSubmitSuccess("Project submitted successfully!")
        // Optionally update local state/UI here
        resetForm()
      } catch (error :any) {
        setSubmitError( error?.message || "Failed to submit project. Please try again.")
      }
    })
  }

  const editDeposit = (deposit: Deposit) => {
    setCurrentDeposit(deposit)
    setIsEditing(true)
    setEditingId(deposit.id)
  }

  const deleteDeposit = (depositId: string) => {
    setDeposits((prev) => prev.filter((d) => d.id !== depositId))
  }

  const getStatusBadge = (status: string, feedback?: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-500", icon: Edit, text: "Draft" },
      pending: { color: "bg-orange-500", icon: Clock, text: "Pending Approval" },
      approved: { color: "bg-green-500", icon: CheckCircle, text: "Approved" },
      rejected: { color: "bg-red-500", icon: XCircle, text: "Rejected" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <div className="flex flex-col gap-1">
        <Badge className={`${config.color} text-white flex items-center gap-1`}>
          <Icon className="w-3 h-3" />
          {config.text}
        </Badge>
        {status === "rejected" && feedback && <p className="text-xs text-red-400 mt-1">{feedback}</p>}
      </div>
    )
  }

  const isFormValid =
    currentDeposit.title?.trim() &&
    currentDeposit.description?.trim() &&
    currentDeposit.year &&
    currentDeposit.specialty &&
    !titleError

  return (
    <div className="min-h-screen bg-[#0F1022] text-white p-6">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Project Deposit
          </h1>
          <p className="text-gray-400">Submit new project proposals for student supervision</p>
        </motion.div>

        {/* Main Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-300 mb-2 block">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    value={currentDeposit.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter a unique project title"
                    className={`bg-gray-800 border-gray-700 text-white ${titleError ? "border-red-500" : ""}`}
                  />
                  {titleError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {titleError}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-300 mb-2 block">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={currentDeposit.description || ""}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Describe your project in detail. You can include links and file references."
                    className="bg-gray-800 border-gray-700 text-white min-h-[200px] resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">Supports rich text, links, and file references</p>
                    <p
                      className={`text-xs ${characterCount > maxCharacters * 0.9 ? "text-orange-400" : "text-gray-500"}`}
                    >
                      {characterCount}/{maxCharacters}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Academic Year *</Label>
                  <Select
                    value={currentDeposit.year || ""}
                    onValueChange={(value) => setCurrentDeposit((prev) => ({ ...prev, year: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {years.map((year) => (
                        <SelectItem key={year} value={year} className="text-white hover:bg-gray-700">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Specialty *</Label>
                  <Select
                    value={currentDeposit.specialty || ""}
                    onValueChange={(value) => setCurrentDeposit((prev) => ({ ...prev, specialty: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty} className="text-white hover:bg-gray-700">
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Status</Label>
                  {getStatusBadge(currentDeposit.status || "draft")}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
              <Button
                onClick={saveDraft}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                disabled={!currentDeposit.title?.trim() || !!titleError}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={submitForApproval}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!isFormValid || isPending}
              >
                <Send className="w-4 h-4 mr-2" />
                {isPending ? "Submitting..." : "Submit for Approval"}
              </Button>
              {isEditing && (
                <Button onClick={resetForm} variant="ghost" className="text-gray-400 hover:text-white">
                  Cancel
                </Button>
              )}
            </div>
            {/* Error/Success messages */}
            {submitError && (
              <div className="mt-4 text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="mt-4 text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {submitSuccess}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Past Deposits Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Past Deposits</h2>

              {deposits.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No deposits yet. Create your first project proposal above.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Title</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Year</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Specialty</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deposits.map((deposit, index) => (
                        <motion.tr
                          key={deposit.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-800 hover:bg-gray-800/30"
                        >
                          <td className="py-4 px-4">
                            <p className="text-white font-medium">{deposit.title}</p>
                            <p className="text-gray-400 text-sm truncate max-w-xs">{deposit.description}</p>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{deposit.year}</td>
                          <td className="py-4 px-4 text-gray-300">{deposit.specialty}</td>
                          <td className="py-4 px-4">{getStatusBadge(deposit.status, deposit.feedback)}</td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              {(deposit.status === "draft" || deposit.status === "rejected") && (
                                <Button
                                  onClick={() => editDeposit(deposit)}
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}
                              {deposit.status === "draft" && (
                                <Button
                                  onClick={() => deleteDeposit(deposit.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
