"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"

export default function AnimatedLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")

  // Auth hook and router
  const { login, isLoading, error, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!email || !password) {
      setFormError("Please enter both email and password")
      return
    }

    if (!agreed) {
      setFormError("Please agree to the terms and conditions")
      return
    }

    setFormError("")

    // Attempt login using React Query mutation
    login( email, password )
  }

  // Animation for the background
  useEffect(() => {
    setLoaded(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(108, 99, 255, ${Math.random() * 0.5 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 - distance / 500})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1022] p-4 relative overflow-hidden">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Animated gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0F1022]/80 to-[#1A1B36]/80 z-10"></div>

      {/* Animated light effects */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#6C63FF]/20 blur-[100px] animate-pulse z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[#6C63FF]/20 blur-[100px] animate-pulse z-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[900px] min-h-[620px] bg-[#0F1022]/60 backdrop-blur-md rounded-[40px] shadow-[0px_0px_70px_rgba(99,65,236,0.2)] relative px-2 py-10 md:px-4 md:py-14 overflow-hidden z-20 border border-[#2A2E61]/50"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-auto mb-12 md:mb-0"
          >
            <div className="w-[300px] h-[300px] md:w-[520px] md:h-[520px] mx-auto rounded-full bg-[#2A2E61] flex items-center justify-center overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_0px_50px_5px_rgba(0,0,0,0.2)]">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 120,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute w-full h-full rounded-full border-2 border-[#6C63FF]/20"
              />
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 80,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute w-[95%] h-[95%] rounded-full border-2 border-[#6C63FF]/10"
              />
              <Image
                src="/images/loginill.png"
                alt="Login Illustration"
                width={520}
                height={520}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-[300px]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-[60px]">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                <p className="text-gray-300 text-sm">
                  Access your account and continue managing your projects effortlessly
                </p>
              </motion.div>

              <div className="space-y-5">
                {/* Show form errors or API errors */}
                {(formError || error) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 text-white px-4 py-2 rounded-md text-sm"
                  >
                    {formError || error}
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-[10px] px-[18px] py-[10px] w-full h-[50px] bg-[#2A2E61]/80 border-2 border-[rgba(99,65,236,0.5)] shadow-[0px_0px_15px_rgba(99,65,236,0.25)] rounded-[10px] group transition-all duration-300"
                >
                  <Mail className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-[#6C63FF] transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-[10px] px-[18px] py-[10px] w-full h-[50px] bg-[#2A2E61]/80 border-2 border-[rgba(99,65,236,0.5)] shadow-[0px_0px_15px_rgba(99,65,236,0.25)] rounded-[10px] group transition-all duration-300"
                >
                  <Lock className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-[#6C63FF] transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                    required
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-shrink-0"
                  >
                    <AnimatePresence mode="wait">
                      {showPassword ? (
                        <motion.div
                          key="eyeOff"
                          initial={{ opacity: 0, rotate: -10 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#6C63FF] transition-colors duration-300" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="eye"
                          initial={{ opacity: 0, rotate: 10 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Eye className="h-5 w-5 text-gray-400 hover:text-[#6C63FF] transition-colors duration-300" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="text-left"
                >
                  <Link
                    href="/forgot-password"
                    className="text-[#6C63FF] text-sm hover:underline inline-block relative group"
                  >
                    Forgot Password ?
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6C63FF] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="h-4 w-4 rounded border-gray-300 text-[#6C63FF] focus:ring-[#6C63FF] opacity-0 absolute"
                    />
                    <div
                      onClick={() => setAgreed(!agreed)}
                      className={`h-4 w-4 rounded border ${agreed ? "bg-[#6C63FF] border-[#6C63FF]" : "bg-transparent border-gray-400"} flex items-center justify-center transition-all duration-300 cursor-pointer`}
                    >
                      {agreed && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#6C63FF] hover:underline relative inline-block group">
                      terms & conditions
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6C63FF] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </label>
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 20px rgba(108,99,255,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#6C63FF] text-white rounded-md hover:bg-[#5b54ff] transition-all duration-300 shadow-[0_4px_6px_rgba(108,99,255,0.2)] relative overflow-hidden group disabled:opacity-70"
                >
                  <span className="relative z-10">{isLoading ? "Logging in..." : "Login"}</span>
                  <span className="absolute top-0 left-0 w-0 h-full bg-[#5b54ff] group-hover:w-full transition-all duration-500 ease-in-out z-0"></span>
                  <span className="absolute top-0 right-0 w-0 h-full bg-[#4a43ff] group-hover:w-full transition-all duration-500 ease-in-out delay-100 z-0"></span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

