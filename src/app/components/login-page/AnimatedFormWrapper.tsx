'use client'
import { motion } from "framer-motion"

export default function AnimatedFormWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial ={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[900px] min-h-[620px] bg-[#0F1022]/60 backdrop-blur-md rounded-[40px] shadow-[0px_0px_70px_rgba(99,65,236,0.2)] relative px-2 py-10 md:px-4 md:py-14 overflow-hidden z-20 border border-[#2A2E61]/50"
        >
            {children}
        </motion.div>
    )
}
