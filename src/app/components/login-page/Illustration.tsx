"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import loginillustration from "@/public/images/login-illustration.png"

export function Illustration() {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-auto mb-12 md:mb-0"
        >
            <div className="w-[300px] h-[300px] md:w-[520px] md:h-[520px] mx-auto rounded-full bg-[#2A2E61] flex items-center justify-center overflow-hidden shadow-lg">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, ease: "linear", repeat: Infinity }} className="absolute w-full h-full rounded-full border-2 border-[#6C63FF]/20" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, ease: "linear", repeat: Infinity }} className="absolute w-[95%] h-[95%] rounded-full border-2 border-[#6C63FF]/10" />
                <Image src={"/images/loginill.png"} alt="Login Illustration" width={520} height={520} className="w-full h-full object-cover" />
            </div>
        </motion.div>
    )
}
