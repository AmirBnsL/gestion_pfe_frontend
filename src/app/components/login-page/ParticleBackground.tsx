"use client"

import {  useRef } from "react"
import { useParticles } from "@/app/hooks/useParticles"

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useParticles(canvasRef)

    return (
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
    )
}
