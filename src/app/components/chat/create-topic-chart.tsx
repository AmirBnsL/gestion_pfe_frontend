"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

// Mock team members data
const teamMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Product Manager",
  },
  {
    id: "2",
    name: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Developer",
  },
  {
    id: "3",
    name: "Taylor Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Designer",
  },
  {
    id: "4",
    name: "Jordan Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Marketing",
  },
  {
    id: "5",
    name: "Casey Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Content Writer",
  },
  {
    id: "6",
    name: "Morgan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "QA Engineer",
  },
];

interface CreateTopicChartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTopicChart({
  open,
  onClose,
}: CreateTopicChartDialogProps) {
  const [topicName, setTopicName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!topicName.trim()) {
        setError("Please enter a topic name");
        return;
      }

      console.log("Topic created:", {
        name: topicName,
        members: selectedMembers.map((id) =>
          teamMembers.find((m) => m.id === id)
        ),
      });

      // Reset form
      setTopicName("");
      setSelectedMembers([]);
      setError("");

      onClose();
    },
    [topicName, selectedMembers, onClose]
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-[#1E2142] border-[#2A2F52] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Topic
          </DialogTitle>
          <p className="text-sm text-slate-400 mt-1">
            Create a topic and invite team members
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Topic Name Input */}
          <div className="space-y-2">
            <Label htmlFor="topicName" className="text-slate-300">
              Topic Name
            </Label>
            <Input
              id="topicName"
              value={topicName}
              onChange={(e) => {
                setTopicName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter topic name..."
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
            {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
          </div>

          {/* Team Members Selection */}
          <div className="space-y-3">
            <Label className="text-slate-300">Invite Team Members</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
                  onClick={() => toggleMember(member.id)}
                >
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {member.role}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        selectedMembers.includes(member.id)
                          ? "bg-purple-600"
                          : "border border-slate-600"
                      }`}
                    >
                      {selectedMembers.includes(member.id) && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              {selectedMembers.length} of {teamMembers.length} members selected
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/50">
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
              Create Topic
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
