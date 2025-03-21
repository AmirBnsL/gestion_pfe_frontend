import Image from 'next/image'




export default function LandingPageUserSection() {
    return <section className="flex justify-center gap-20 p-12 ">
        <div className="bg-gray-800 p-6 rounded-xl text-white text-center w-1/3 border border-gradient-border backdrop-blur-lg shadow-custom">
            <h3 className="text-2xl font-semibold">I'm a Student</h3>
            <div className="relative w-full h-48">
                <Image alt="student" src="/student.svg" fill={true} 	style={{objectFit: "contain"}} />
            </div>
            <p className="mt-2">Create, collaborate, and manage your academic projects effortlessly.</p>
            <div className={"flex justify-center items-center gap-2.5"}>
                <button className="mt-4 bg-button-purple font-bold px-4 py-2 rounded-lg">Get started</button>
                <button className="mt-4 outline outline-outline-purple font-bold  text-outline-purple px-4 py-2 rounded-lg">Join a team</button>
            </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-white text-center w-1/3 border border-gradient-border backdrop-blur-lg shadow-custom">
            <h3 className="text-2xl font-semibold">I'm a Teacher</h3>
            <div className="relative w-full h-48">
                <Image alt="student" src="/teacher.svg"  fill={true} 	style={{objectFit: "contain"}} />
            </div>
            <p className="mt-2">Mentor students, track progress, and manage academic projects effortlessly.</p>
            <button className="mt-4 bg-button-purple font-bold px-4 py-2 rounded-lg">Start Supervising</button>
        </div>
    </section>
}