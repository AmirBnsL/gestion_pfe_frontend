"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Label } from "@/app/components/ui/label"

interface CreateAnnouncementDialogProps {
  open: boolean
  onClose: () => void
}

export default function CreateAnnouncementDialog({ open, onClose }: CreateAnnouncementDialogProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [audience, setAudience] = useState("all")
  const [priority, setPriority] = useState("medium")

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, message, audience, priority })
    onClose()
  }, [title, message, audience, priority, onClose])

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
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="bg-[#161A35] border-[#2A2F52]">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="teachers">Teachers Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-[#161A35] border-[#2A2F52]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Create Announcement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
