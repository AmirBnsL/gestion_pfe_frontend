"use client"

import type React from "react"
import { useState, useCallback, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Label } from "@/app/components/ui/label"
import { Audience, handleCreateAnnouncement, Priority } from "./announcementActions"

interface CreateAnnouncementDialogProps {
  open: boolean
  onClose: () => void
}

export default function CreateAnnouncementDialog({ open, onClose }: CreateAnnouncementDialogProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [audience, setAudience] = useState<Audience>(Audience.All)
  const [priority, setPriority] = useState<Priority>(Priority.Medium)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      startTransition(async () => {
        try {
          console.log("Creating announcement with data:", {
            title,
            message,
            audience,
            priority,
          })
          await handleCreateAnnouncement({
            title,
            body: message,
            audience,
            priority,
          })
          setTitle("")
          setMessage("")
          setAudience(Audience.All)
          setPriority(Priority.Medium)
          onClose()
        } catch (err: any) {
          setError(err?.body || "Failed to create announcement.")
        }
      })
    },
    [title, message, audience, priority, onClose]
  )

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-[#1E2142] border-[#2A2F52] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Announcement</DialogTitle>
          <p className="text-sm text-slate-400 mt-1">Share a new announcement with your audience</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#161A35] border-[#2A2F52]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message Body</Label>
            <Textarea
              id="message"
              placeholder="Enter the details of your announcement"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#161A35] border-[#2A2F52] min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Audience</Label>
              <Select value={audience} onValueChange={value => setAudience(value as Audience)}>
                <SelectTrigger className="bg-[#161A35] border-[#2A2F52]">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value={Audience.ALL}>All Users</SelectItem>
                  <SelectItem value={Audience.STUDENTS}>Students Only</SelectItem>
                  <SelectItem value={Audience.TEACHERS}>Teachers Only</SelectItem>
                  <SelectItem value={Audience.ADMINS}>Admins Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={priority} onValueChange={value => setPriority(value as Priority)}>
                <SelectTrigger className="bg-[#161A35] border-[#2A2F52]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  
                  <SelectItem value={Priority.HIGH}>High</SelectItem>
                  <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={Priority.LOW}>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Announcement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}