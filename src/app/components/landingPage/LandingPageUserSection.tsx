export default function LandingPageUserSection() {
    return <section className="flex justify-center gap-8 p-12">
        <div className="bg-gray-800 p-6 rounded-xl text-white text-center w-1/3">
            <h3 className="text-2xl font-semibold">I'm a Student</h3>
            <p className="mt-2">Create, collaborate, and manage your academic projects effortlessly.</p>
            <button className="mt-4 bg-purple-600 px-4 py-2 rounded-lg">Get started</button>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-white text-center w-1/3">
            <h3 className="text-2xl font-semibold">I'm a Teacher</h3>
            <p className="mt-2">Mentor students, track progress, and manage academic projects effortlessly.</p>
            <button className="mt-4 bg-purple-600 px-4 py-2 rounded-lg">Start Supervising</button>
        </div>
    </section>
}