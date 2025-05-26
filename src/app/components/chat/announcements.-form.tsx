"use client";

import type React from "react";

import { useState } from "react";
import { useSocket } from "@/app/hooks/use-socket";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { AlertCircle, Send } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface AnnouncementsFormProps {
  isAdmin?: boolean;
}

export default function AnnouncementsForm({
  isAdmin = false,
}: AnnouncementsFormProps) {
  const [message, setMessage] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { publishAnnouncement, isConnected } = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Please enter an announcement message");
      return;
    }

    // In a real app, you would verify admin status through proper authentication
    // This is just for demo purposes to match the test client
    const isAdminVerified = isAdmin || adminPassword === "admin";

    if (!isAdminVerified) {
      setError("You need admin privileges to publish announcements");
      return;
    }

    const success = publishAnnouncement(message, isAdminVerified);

    if (success) {
      setMessage("");
      setError(null);
    } else {
      setError("Failed to publish announcement. Please check your connection.");
    }
  };

  return (
    <Card className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-slate-200">
            Publish Announcement
          </CardTitle>
          <Badge
            variant="outline"
            className={
              isConnected
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/30 rounded-md flex items-center text-red-300">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdmin && (
            <div>
              <label
                htmlFor="adminPassword"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Admin Password
              </label>
              <Input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="announcement"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Announcement Message
            </label>
            <div className="flex space-x-2">
              <Input
                id="announcement"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter announcement message..."
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                disabled={!isConnected}
              />
              <Button
                type="submit"
                disabled={!isConnected || !message.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
