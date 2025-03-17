

export default function LandingPageNavBar() {
    return (
        <nav className="flex justify-between items-center px-20 py-6 bg-opacity-10 backdrop-blur-lg w-full">
            <div className="text-white font-bold text-3xl">LOGO</div>
            <ul className="flex gap-12 text-white text-lg">
                <li>Home</li>
                <li>Projects</li>
                <li>About</li>
                <li>How It Works</li>
                <li>Contact</li>
            </ul>
            <div className="flex gap-4">
                <button className="text-outline-purple outline-outline-purple  outline-2 outline rounded-lg py-2 px-4">Log in</button>
                <button className="bg-button-purple px-4 py-2 rounded-lg text-primary-text">Sign up</button>
            </div>
        </nav>
    )
}