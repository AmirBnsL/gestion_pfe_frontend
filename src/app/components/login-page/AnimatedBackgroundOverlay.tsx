'use client'
export function AnimatedBackgroundOverlay() {
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0F1022]/80 to-[#1A1B36]/80 z-10" />
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#6C63FF]/20 blur-[100px] animate-pulse z-10" />
            <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[#6C63FF]/20 blur-[100px] animate-pulse z-10" />
        </>
    )
}
