'use client'
import { motion } from "framer-motion";

export default function MotionButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}