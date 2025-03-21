
import WeirdShape from "@public/Rectangle 7.svg"; // Import your SVG
import Image from "next/image";

const TestimonialCard = ({ name, text, imageSrc }:{name:string,text:string,imageSrc:string}) => {
    return (
        <div className="relative w-[512px] h-[480px] flex items-center justify-center">

            <WeirdShape className="absolute"/>


            <div className="relative z-10 flex flex-col gap-12 items-center p-6 w-4/5">

                <div className="flex justify-evenly items-center gap-4 w-full">
                    <Image
                        src={imageSrc}
                        alt={name}
                        width={100}
                        height={100}
                        className="rounded-full border border-gray-500"
                    />
                    <div className={"flex flex-col items-start"}>
                        <h3 className="text-[#E8E3FC] text-4xl font-semibold">{name}</h3>
                        <p className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</p>
                    </div>
                </div>

                {/* Text Section */}
                <p className="text-white  text-lg leading-relaxed text-center mt-4">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;