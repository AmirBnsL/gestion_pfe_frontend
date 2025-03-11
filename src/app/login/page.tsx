"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

export default function ResponsiveLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1022] p-4">
       <div className="w-full max-w-[900px] min-h-[620px] bg-[#0F1022] rounded-[40px] shadow-[0px_0px_70px_rgba(99,65,236,0.1)] relative px-2 py-10 md:px-4 md:py-14 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
      
          <div className="w-full md:w-auto mb-12 md:mb-0">
            <div className="w-[300px] h-[300px] md:w-[520px] md:h-[520px] mx-auto rounded-full bg-[#2A2E61] flex items-center justify-center overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_0px_50px_5px_rgba(0,0,0,0.2)]">
              <Image 
                src="/images/loginill.png" 
                alt="Login Illustration" 
                width={520} 
                height={520} 
                layout="intrinsic" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          
          <div className="w-full md:w-[300px]">
            <div className="flex flex-col gap-10 md:gap-[60px]">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                <p className="text-gray-300 text-sm">
                  Access your account and continue managing your projects effortlessly
                </p>
              </div>

              <div className="space-y-5">
             
                <div className="flex items-center gap-[10px] px-[18px] py-[10px] w-full h-[50px] bg-[#2A2E61] border-2 border-[rgba(99,65,236,0.5)] shadow-[0px_0px_15px_rgba(99,65,236,0.25)] rounded-[10px]">
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>

           
                <div className="flex items-center gap-[10px] px-[18px] py-[10px] w-full h-[50px] bg-[#2A2E61] border-2 border-[rgba(99,65,236,0.5)] shadow-[0px_0px_15px_rgba(99,65,236,0.25)] rounded-[10px]">
                  <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex-shrink-0">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                
                <div className="text-left">
                  <Link href="#" className="text-[#6C63FF] text-sm hover:underline">
                    Forgot Password ?
                  </Link>
                </div>

           
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="h-4 w-4 rounded border-gray-300 text-[#6C63FF] focus:ring-[#6C63FF]"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    I agree to the{" "}
                    <Link href="#" className="text-[#6C63FF] hover:underline">
                      terms & conditions
                    </Link>
                  </label>
                </div>

              
                <button
                  type="button"
                  className="w-full py-3 bg-[#6C63FF] text-white rounded-md hover:bg-[#5b54ff] transition-colors shadow-[0_4px_6px_rgba(108,99,255,0.2)]"
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
