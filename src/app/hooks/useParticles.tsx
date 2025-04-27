import { useEffect } from "react"

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Particle[] = []
        const particleCount = 100

        class Particle { /* Same particle class logic here */ }

        const init = () => { /* Initialize particles */ }
        const animate = () => { /* Animate particles */ }
        const handleResize = () => { /* Resize canvas */ }

        window.addEventListener("resize", handleResize)
        init()
        animate()

        return () => window.removeEventListener("resize", handleResize)
    }, [canvasRef])
}
