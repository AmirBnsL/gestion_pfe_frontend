
import TestimonialCard from "@/app/components/landingPage/TestimonialComponentCard";





export default function LandingPageTestimonialSection() {
    const testimonials = [
        {
            name: "Maxn Raval",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageSrc: "/avatar1.jpg",
        },
        {
            name: "wiw wiwawa",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageSrc: "/avatar2.jpg",
        },
    ];

    return (
        <section className="py-20  text-center">
            <h2 className="text-white text-3xl font-bold mb-12">
                What People Say About Us
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
                {testimonials.map((t, index) => (
                    <TestimonialCard key={index} {...t} />
                ))}
            </div>
        </section>
    );
}
