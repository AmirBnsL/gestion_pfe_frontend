import Image from 'next/image'

import OriginalWeirdRectangle from '../../../../public/Rectangle1446.svg';
import {ReactNode} from "react"

interface Feature {
    title: string;
    description: string;
    imageSrc: string;
}

const WeirdRectangle = ({ children, ...props}:{children:ReactNode}) => (
    <div className="relative w-1/3 aspect-[4/3]" {...props}>
        <OriginalWeirdRectangle className="object-contain"   />
        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 text-white">
            {children}
        </div>
    </div>
);

const features: Feature[] = [
    {
        title: "Work Together Effortlessly",
        description: "Connect with teammates and mentors, share ideas, and collaborate in real-time.",
        imageSrc: "/independante_woman.svg",
    },
    {
        title: "Manage Your Projects Easily",
        description: "Keep track of your progress, deadlines, and updates—all in one place.",
        imageSrc: "/ingeniums.svg",
    },
    {
        title: "Stay Organized",
        description: "Organize your tasks and projects with ease.",
        imageSrc: "/amro_black.svg",
    },
];



export function LandingPageFeaturesSection() {
    return (
        <section className="text-white text-center py-12 px-22">
            <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
            <div className="flex justify-center gap-8 mt-48">
                {features.map((feature, index) => (
                    <WeirdRectangle  key={index}>
                        <div className="absolute bottom-[40%] w-full h-full">
                            <Image src={feature.imageSrc} alt={feature.title}  layout="fill" objectFit="contain" />
                        </div>
                        <div className="h-2/3 flex flex-col justify-center w-10/12">
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2">{feature.description}</p>
                        </div>
                    </WeirdRectangle>
                ))}
            </div>
        </section>
    );
}