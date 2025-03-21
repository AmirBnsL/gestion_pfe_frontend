import Musa from "@public/musa.svg";

export default function LandingPageCTASection() {
    return <section className="relative text-white rounded-[88px] text-center w-10/12 flex justify-center items-center p-20 bg-gray-900  ">
        <Musa className={"absolute right-[60%]"}></Musa>
        <div className={"flex flex-col items-center"}>
            <h2 className="text-4xl font-bold">Ready to Get Started</h2>
            <p className="mt-4 w-3/5 text-sm">Take control of your academic projects with ease. Whether you're a student looking to collaborate, a teacher guiding projects, or an admin managing the process, our platform simplifies every step. Join now and experience a smarter way to handle projects—efficient, organized, and built for success!</p>
            <button className="mt-6 bg-purple-600 px-6 py-3 rounded-lg">Sign up</button>
        </div>

    </section>
}