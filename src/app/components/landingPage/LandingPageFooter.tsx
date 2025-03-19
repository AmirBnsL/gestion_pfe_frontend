export function LandingPageFooter() {
    return <footer className="text-white text-center p-12 bg-[#5C48B0] w-full flex justify-between items-center">
        <div className={"w-1/3 gap-5 flex flex-col items-start"}>
            <h3 className={"font-bold text-3xl"}>LOGO</h3>
            <p className={"w-full text-start text-sm"}>A smart and seamless platform for students and teachers to collaborate, manage, and track academic projects effortlessly</p>
            <div className={"flex items-center"}>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/facebook.svg" alt="Facebook" />
                </a>
                <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/twitter.svg" alt="Twitter" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/instagram.svg" alt="Instagram" />
                </a>
            </div>

        </div>
        <div className={"flex items-center flex-col"}>
            <p>&copy; 2025 LOGO - All rights reserved.</p>
            <p>In Partnership with ESI-SBA</p>

        </div>

    </footer>
}