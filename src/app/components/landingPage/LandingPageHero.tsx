export default function LandingPageHero() {
    return <section className="text-center py-20 text-white flex flex-col justify-center items-center gap-4 3xl:gap-8">
        <h1 className="text-4xl xl:text-6xl font-bold">Create And Manage Your <br/> Own Project</h1>
        <p className="mt-4 text-lg md:text-xl">A platform for students and teachers to create, manage, and <br/> track academic projects—collaborate, submit, and succeed</p>
        <div className="mt-6 flex justify-center gap-4">
            <button className="bg-button-purple font-bold px-4 py-2 rounded-lg">Get started</button>
            <button className="outline outline-2 outline-outline-purple text-outline-purple px-4 py-2 rounded-lg">See how it works</button>
        </div>
    </section>
}