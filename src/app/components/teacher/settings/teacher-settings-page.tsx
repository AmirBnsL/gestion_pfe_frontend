"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Camera } from "lucide-react"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

export function TeacherSettingsPage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("supervisor")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log("Saving teacher settings")
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="">
        <div className="mb-8">
         
          <p className="text-slate-400">Manage your account preferences</p>
        </div>

        <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group p-6 space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
          <div className="relative z-10 space-y-6">
            {/* Profile Picture */}
            <div className="space-y-2">
              <Label className="text-white">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage || "/placeholder.svg"} />
                  <AvatarFallback>TD</AvatarFallback>
                </Avatar>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-upload"
                  />
                  <Label
                    htmlFor="profile-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Label>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <Label className="text-white">Change Password</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password" className="text-slate-300">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-slate-300">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-slate-300">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </div>




            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20 px-8 py-2 rounded-md font-semibold transition-all duration-300"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
