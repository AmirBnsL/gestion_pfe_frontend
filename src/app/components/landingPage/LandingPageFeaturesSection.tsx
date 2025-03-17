
export function LandingPageFeaturesSection() {
    return <section className="text-white text-center py-12">
        <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
        <div className="flex justify-center gap-8 mt-8">
            <div className="bg-gray-800 p-6 rounded-xl w-1/3">
                <h3 className="text-xl font-semibold">Manage Your Projects Easily</h3>
                <p className="mt-2">Keep track of your progress, deadlines, and updates—all in one place.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl w-1/3">
                <h3 className="text-xl font-semibold">Work Together Effortlessly</h3>
                <p className="mt-2">Connect with teammates and mentors, share ideas, and collaborate in real-time.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl w-1/3">
                <h3 className="text-xl font-semibold">Secure And Organized</h3>
                <p className="mt-2">Store your project files safely and access them whenever you need.</p>
            </div>
        </div>
    </section>
}